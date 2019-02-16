/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*-------------------------------------------------\
|                                                  |
| UsageStatsModule                                 |
| Sample app extended by Michael Parlato           |
| Source code:                                     |
| https://github.com/mvincent7891/UsageStatsModule |
|                                                  |
| Credit to Cole Murray:                           |
| https://github.com/ColeMurray/UsageStatsSample   |
|                                                  |
\-------------------------------------------------*/

import React, { Component } from 'react';
import moment from 'moment';
import tx from 'moment-timezone';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BackgroundTask from 'react-native-background-task';
import SQLite from 'react-native-sqlite-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DeviceInfo from 'react-native-device-info';

import {
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
  NativeModules
} from 'react-native';

const UsageStats = NativeModules.UsageStats;

import _ from 'lodash';

const db = SQLite.openDatabase({ name: 'usageStatesDb.db' });

BackgroundTask.define(async () => {
  UsageStats.getAppsToday()
    .then(apps => {
      insertAutoDb(apps);
    })
    .catch(error => {
      alert(error);
    });
  // Remember to call finish()
  BackgroundTask.finish();
});

function insertAutoDb(apps) {
  db.transaction((tx) => {
    tx.executeSql(`DELETE FROM apps WHERE DATE(created) = "${moment().tz('Europe/London').format('YYYY-MM-DD')}"`, []);
    _.forEach(apps, function (app, appKey) {
      tx.executeSql(`INSERT INTO apps (packageIcon, packageName, usageTime) VALUES ("${app.packageIcon}", "${app.packageName}", ${app.usageTime})`, []);
    })
  });
}

export default class SampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      durationInDays: 7,
      isFetching: false,
      isDateTimePickerVisible: false,
      selectedDate: moment().tz('America/Cuiaba').format('DD/MM/YYYY')
    };

    this.getStats();

    createTableIfNotExists();
    selectAllFromApps();
  }

  createTableIfNotExists() {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS apps(id INTEGER PRIMARY KEY AUTOINCREMENT, packageIcon TEXT, packageName TEXT, usageTime INT NOT NULL, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
        []
      );
    });
  }

  selectAllFromApps() {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM apps", [], function (txn, data) {
        _.forEach(data.rows, function (app, key) {
          console.log(data.rows.item(key));
        });
      });
    })
  }

  componentDidMount() {
    BackgroundTask.schedule({
      period: 900, // Aim to run every 15 min - more conservative on battery
    });

    // Optional: Check if the device is blocking background tasks or not
    this.checkStatus();
  }

  async checkStatus() {
    const status = await BackgroundTask.statusAsync()

    if (status.available) {
      return;
    }

    const reason = status.unavailableReason
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app');
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert('Restricted', 'Background tasks are restricted on your device');
    }
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.getStats() });
  }

  getStats() {
    UsageStats.getAppsToday()
      .then(stats => {
        this.updateDatabaseFromToday(stats);
        this.setState({ stats })
        this.setState({ isFetching: false })
      })
      .catch(error => {
        alert(error);
      });
  }

  updateDatabaseFromToday(apps) {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM apps WHERE DATE(created) = "${moment().tz('Europe/London').format('YYYY-MM-DD')}"`, []);
      _.forEach(apps, function (app, appKey) {
        tx.executeSql(`INSERT INTO apps (packageIcon, packageName, usageTime) VALUES ("${app.packageIcon}", "${app.packageName}", ${app.usageTime})`, []);
      })
    });
  }

  selectFromDatabaseForDate(selectedDate) {
    db.transaction((tx) => {
      let stats = [];
      tx.executeSql(`SELECT * FROM apps WHERE DATE(created) = "${selectedDate}"`, [], function (txn, data) {
        _.forEach(data.rows, function (table, key) {
          stats.push(data.rows.item(key))
        });
      })
      this.setState({ stats })
    });
  }

  getUsageStatsList() {
    const stats = UsageStats.getUsageStatsList();
    // this.setState({ stats });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const selectedDate = moment(date).format('DD/MM/YYYY')
    this.setState({ selectedDate });
    selectFromDatabaseForDate(selectedDate);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
        <View style={styles.usageDiaryContainer}>
          <Text style={[styles.usageDiaryTitle, styles.fontPattern]}>Usage Diary</Text>
          <Text style={[styles.usageDiarySelectedDate, styles.fontPattern]}>{this.state.selectedDate}</Text>
          <Text style={styles.usageDiaryStatus}></Text>
        </View>
        <View style={styles.appContainer}>
          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            style={styles.appContainerList}
            data={this.state.stats}
            keyExtractor={item => item.packageName}
            renderItem={({ item }) => {
              const lastUsage = moment(new Date(item.usageTime * 1000)).format('MM/DD/YYYY hh:MM');
              const years = moment.duration(item.totalActivedTime, 'milliseconds').asYears();
              const months = moment.duration(years - Math.floor(years), 'years').asMonths();
              const days = moment.duration(months - Math.floor(months), 'months').asDays();
              const totalActived = `${parseInt(years)} anos ${parseInt(months)} meses e ${parseInt(days)} dias`;

              const tHours = moment.duration(item.usageTime, 'milliseconds').asHours();
              const tMinutes = moment.duration(tHours - Math.floor(tHours), 'hours').asMinutes();
              const tSeconds = moment.duration(tMinutes - Math.floor(tMinutes), 'minutes').asSeconds();

              const totalUsage = `${parseInt(tHours)} horas e ${parseInt(tMinutes)} minutos e ${parseInt(tSeconds)} segundos`;
              return (
                <View style={styles.appContainerListItem}>
                  <View style={styles.inline}>
                    <Image style={styles.appContainerListItemIcon} resizeMode={'contain'} source={{ uri: 'data:image/png;base64,' + item.packageIcon }} />
                    <Text style={[styles.appContainerListItemName, styles.fontPattern]}>{item.packageName}</Text>
                  </View>
                  <Text style={[styles.appContainerListItemTotalUsage, styles.fontPattern]}>total usage: {totalUsage}</Text>
                  {/* <Text style={[styles.appContainerListItemLastUsage, styles.fontPattern]}>last usage: {lastUsage}</Text> */}
                  {/* <Text style={[styles.appContainerListItemTotalActived, styles.fontPattern]}>total actived: {totalActived}</Text> */}
                </View>
              );
            }}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.alignCenter, styles.mt10]}>
            <FontAwesome5
              style={[styles.footerCalendar]}
              onPress={this._showDateTimePicker} name={'calendar-alt'}
            />
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  usageDiaryContainer: {
    flex: 0.6,
    paddingLeft: 15,
    paddingTop: 20,
    backgroundColor: '#4169E1',
    flexDirection: 'row'
  },
  usageDiary: {
    textAlign: 'left',
  },
  usageDiaryTitle: {
    marginRight: 10,
  },
  usageDiarySelectedDate: {
    textAlign: 'center',
    width: 85,
    height: 20,
    borderRadius: 50,
    borderWidth: 0.9,
    borderColor: '#FFF',
  },
  usageDiaryStatus: {
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 50,
    borderWidth: 1,
    height: 10,
    width: 10,
    backgroundColor: '#71c733',
    borderColor: '#71c733',
  },
  appContainer: {
    flex: 7,
    backgroundColor: '#fff'
  },
  appContainerList: {
    backgroundColor: '#1E90FF',
    paddingBottom: 10,
    borderTopColor: '#FFF',
    borderTopWidth: 1,
  },
  appContainerListItem: {
    borderTopColor: '#FFF',
    borderTopWidth: 1,
    padding: 10
  },
  appContainerListItemIcon: {
    height: 40,
    width: 40
  },
  appContainerListItemName: {
    marginTop: 10,
    marginLeft: 8
  },
  footer: {
    borderTopColor: '#FFF',
    borderTopWidth: 1,
    backgroundColor: '#4B0082',
    flex: 1,
  },
  footerCalendar: {
    fontSize: 40,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fontPattern: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Merriweather Sans'
  },
  alignCenter: {
    textAlign: 'center',
  },
  mt10: {
    marginTop: 10
  },
  inline: {
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);