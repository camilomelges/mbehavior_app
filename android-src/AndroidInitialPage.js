import React, { Component } from 'react';
import moment from 'moment';
import tx from 'moment-timezone';
import BackgroundTask from 'react-native-background-task';
import SQLite from 'react-native-sqlite-storage';
import SqLiteAndroid from './SqLiteAndroid';
import _ from 'lodash';
import AndroidAppStyles from './AndroidAppStyles';
import AndroidNotifications from './AndroidNotifications';
import AndroidPrizes from './AndroidPrizes';
import AndroidMyData from './ResearchData';
import AndroidAppsLifeTime from './AndroidAppsLifeTime';
import unbImage from '../assets/images/unb.jpg';

const androidAppStyles = new AndroidAppStyles();
const sqLiteAndroid = new SqLiteAndroid();

import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  Alert,
  ImageBackground,
  TouchableOpacity,
  NativeModules,
  NetInfo,
  Dimensions,
  ScrollView
} from 'react-native';

const UsageStats = NativeModules.UsageStats;

const db = SQLite.openDatabase({ name: 'usageStatesResearchDb.db' });

// const dtb = Storage.open('usageStatesDb.db');

// BackgroundTask.define(async () => {
//   UsageStats.getAppsToday()
//     .then(apps => {
//       verifyIfOpenSchedule(apps);
//     })
//     .catch(error => {
//       alert(error);
//     });
//   // Remember to call finish()
//   BackgroundTask.finish();
// });

// function verifyIfOpenSchedule(apps) {
//   this.selectAppsOrderLastUsage();
//   let lastOpenedApps = this.state.stats;
//   _.forEach(lastOpenedApps, function (lastOpenedAppKey, lastOpenedApp) {
//     _.forEach(apps, function (appKey, app) {
//       if ((app.packageName === lastOpenedApps.packageName) && (app.usageTime != lastOpenedApps.usageTime)) {
//         lastOpenedApps[lastOpenedAppKey].usageInThisSession = app.usageTime - lastOpenedApps.usageTime;
//         sqLiteAndroid.updateLastUsageApp(lastOpenedApps[lastOpenedAppKey]);
//         sqLiteAndroid.insertAppLast(app);
//       }
//     });
//   });
// }

export default class AndroidInitialPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actualComponent: 0,
      stats: [],
      durationInDays: 7,
      isFetching: true,
      isDateTimePickerVisible: false,
      selectedDate: moment().tz('America/Cuiaba').format('DD/MM/YYYY'),
      styles: androidAppStyles.index(),
      logged: false
    };

    this.getStats();
  };

  verifyIfOpen = async (apps, callback) => {
    // sqLiteAndroid.insertFirstApps(apps);
    await this.selectAppsOrderLastUsage((lastOpenedApps) => {
      if (lastOpenedApps && lastOpenedApps.length) {
        _.forEach(lastOpenedApps, function (lastOpenedApp, lastOpenedAppKey) {
          _.forEach(apps, function (app, appKey) {
            if ((app.packageName === lastOpenedApp.packageName) && (app.usageTime != lastOpenedApp.usageTime)) {
              lastOpenedApp.usageInThisSession = app.usageTime - lastOpenedApp.usageTime;
              sqLiteAndroid.updateLastUsageApp(lastOpenedApp, lastOpenedApp => {
                sqLiteAndroid.insertAppLast(app, app => {
                  return callback(app);
                });
              });
            }
          });
        });
        callback(lastOpenedApps);
      } else {
        sqLiteAndroid.insertFirstApps((apps), apps => {
          callback(apps);
        });
      }
    });
  }

  componentDidMount() {
    BackgroundTask.schedule({
      period: 900, // Aim to run every 15 min - more conservative on battery
    });

    // Optional: Check if the device is blocking background tasks or not
    this.checkStatus();
  }

  checkStatus = async () => {
    const status = await BackgroundTask.statusAsync();

    if (status.available) {
      return;
    }

    const reason = status.unavailableReason
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert('Negado', 'Please enable background "Background App Refresh" for this app');
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert('Restricted', 'Background tasks are restricted on your device');
    }
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.getStats() });
  }

  selectAppsOrderLastUsage = async (callback) => {
    db.transaction((tx) => {
      let lastOpenedApps = [];
      tx.executeSql(`SELECT * from apps WHERE last = 1`, [], function (tx, data) {
        _.forEach(data.rows, function (table, key) {
          lastOpenedApps.push(data.rows.item(key));
        });
        callback(lastOpenedApps);
      });
    });
  }

  getStats() {
    UsageStats.getAppsToday()
      .then(apps => {
        this.verifyIfOpen(apps, () => {
          // this.selectAppsOrderLastUsage();
          this.setState({ isFetching: false });
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  setActualComponent(actualComponent) {
    this.setState({ actualComponent });
  }

  renderComponent() {
    switch (this.state.actualComponent) {
      case 1:
        return (<AndroidNotifications />);
      case 2:
        return (<AndroidPrizes />);
      case 3:
        return (<AndroidMyData />);
      case 4:
        return (<AndroidAppsLifeTime />);
      default:
        return (
          <View style={this.state.styles.notificationsContainer}>
            <ScrollView>

            </ScrollView>
          </View>
        );
    }
  }

  milimitersToTimeSpendDays(time) {
    const years = moment.duration(time, 'milliseconds').asYears();
    const months = moment.duration(years - Math.floor(years), 'years').asMonths();
    const days = moment.duration(months - Math.floor(months), 'months').asDays();
    const hours = moment.duration(days, - Math.floor(days), 'days').asHours();
    const minutes = moment.duration(hours - Math.floor(hours), 'hours').asMinutes();
    const seconds = moment.duration(minutes - Math.floor(minutes), 'minutes').asSeconds();

    return `${parseInt(years)} anos ${parseInt(months)} meses ${parseInt(days)} dias 
            ${parseInt(hours)} horas e ${parseInt(minutes)} minutos e ${parseInt(seconds)} segundos`;
  }

  milimitersToTimeSpendDiary(time) {
    const hours = moment.duration(time, 'milliseconds').asHours();
    const minutes = moment.duration(hours - Math.floor(hours), 'hours').asMinutes();
    const seconds = moment.duration(minutes - Math.floor(minutes), 'minutes').asSeconds();

    return `${parseInt(hours)} horas e ${parseInt(minutes)} minutos e ${parseInt(seconds)} segundos`;
  }

  onLayout() {
    this.setState({ styles: androidAppStyles.index() });
  }

  _handleLoggedUser() {
    if (!this.state.isFetching) {
      return (
        <View
          style={this.state.styles.container}
          onLayout={this.onLayout.bind(this)}>
          <StatusBar backgroundColor="#145cc7" barStyle="light-content" />
          <View style={this.state.styles.usageDiaryContainer}>
            <Text style={[this.state.styles.usageDiaryTitle, this.state.styles.fontPattern]}>Pesquisa</Text>
            <Text style={[this.state.styles.usageDiarySelectedDate, this.state.styles.fontPattern]}>{this.state.selectedDate}</Text>
          </View>
          {
            unbImage ?
              <ImageBackground source={unbImage}
                style={{ width: '100%', flex: 7 }}
                imageStyle={{ resizeMode: 'cover', backgroundColor: '#009fff' }}>
                <View style={this.state.styles.body}>
                  <View style={this.state.styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => this.setActualComponent(3)} style={[this.state.styles.buttonTop, this.state.styles.borderRadiusLeft]} title="Notificações" accessibilityLabel="Notificações">
                      <Text style={[this.state.styles.fontPattern, this.state.styles.alignCenter]}> Pesquisa </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setActualComponent(2)} style={this.state.styles.buttonTop} title="Prêmios" accessibilityLabel="Prêmios">
                      <Text style={[this.state.styles.fontPattern, this.state.styles.alignCenter]}> Prêmios </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setActualComponent(1)} style={[this.state.styles.buttonTop, this.state.styles.borderRadiusRight]} title="Meus dados" accessibilityLabel="Meus dados">
                      <Text style={[this.state.styles.fontPattern, this.state.styles.alignCenter]}> Notificações </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={this.state.styles.bodyContainer}>
                    {this.renderComponent()}
                  </View>
                </View>
              </ImageBackground>
              : null
          }
        </View>
      );
    } else {
      return (<View />)
    }
  }

  render() {
    return (this._handleLoggedUser());
  }
}