import React, { Component } from 'react';
import moment from 'moment';
import tx from 'moment-timezone';
import BackgroundTask from 'react-native-background-task';
import SQLite from 'react-native-sqlite-storage';
import DeviceInfo from 'react-native-device-info';
import SqLiteAndroid from './android-src/SqLiteAndroid';
import _ from 'lodash';
import AndroidAppStyles from './android-src/AndroidAppStyles';
import AndroidNotifications from './android-src/AndroidNotifications';
import AndroidPrizes from './android-src/AndroidPrizes';
import AndroidMyData from './android-src/ResearchData';

const androidAppStyles = new AndroidAppStyles();
const sqLiteAndroid = new SqLiteAndroid();

import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
  NativeModules,
  NetInfo,
  Dimensions,
  ScrollView
} from 'react-native';

const UsageStats = NativeModules.UsageStats;

const db = SQLite.openDatabase({ name: 'usageStatesDb.db' });

BackgroundTask.define(async () => {
  UsageStats.getAppsToday()
    .then(apps => {
      verifyIfOpenSchedule(apps);
    })
    .catch(error => {
      alert(error);
    });
  // Remember to call finish()
  BackgroundTask.finish();
});

function verifyIfOpenSchedule(apps) {
  this.selectAppsOrderLastUsage();
  let lastOpenedApps = this.state.stats;
  _.forEach(lastOpenedApps, function (lastOpenedAppKey, lastOpenedApp) {
    _.forEach(apps, function (appKey, apps) {
      if ((app.packageName === lastOpenedApps.packageName) && (app.usageTime != lastOpenedApps.usageTime)) {
        lastOpenedApps[lastOpenedAppKey].usageInThisSession = app.usageTime - lastOpenedApps.usageTime;
        sqLiteAndroid.updateLastUsageApp(lastOpenedApps[lastOpenedAppKey]);
        sqLiteAndroid.insertAppLast(app);
      }
    });
  });
}

export default class AndroidApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actualComponent: 0,
      stats: [],
      durationInDays: 7,
      isFetching: false,
      isDateTimePickerVisible: false,
      selectedDate: moment().tz('America/Cuiaba').format('DD/MM/YYYY'),
      apiLevel: DeviceInfo.getAPILevel(),
      appName: DeviceInfo.getApplicationName(),
      phoneBrand: DeviceInfo.getBrand(),
      phoneCarrier: DeviceInfo.getCarrier(),
      phoneModel: DeviceInfo.getModel(),
      phoneNumber: DeviceInfo.getPhoneNumber(),
      phoneManufacturer: DeviceInfo.getManufacturer(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      timezone: DeviceInfo.getTimezone(),
      batteryLevel: 0,
      ip: '255.255.255.255',
      userAgent: DeviceInfo.getUserAgent(),
      airPlaneModeOn: false,
      isEmulator: DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet(),
      isLandscape: DeviceInfo.isLandscape(),
      deviceType: DeviceInfo.getDeviceType(),
      connectionInfo: {
        type: '',
        effectiveType: ''
      },
      screen: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
      },
      styles: androidAppStyles.index()
    };

    DeviceInfo.isAirPlaneMode().then(airPlaneModeOn => {
      this.setState({ airPlaneModeOn });
    });

    DeviceInfo.getBatteryLevel().then(batteryLevel => {
      this.setState({ batteryLevel });
    });

    DeviceInfo.getIPAddress().then(ip => {
      this.setState({ ip });
    });

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.setState({ connectionInfo });
    });

    this.getStats();
  };

  async verifyIfOpen(apps) {
    try {
      await sqLiteAndroid.insertFirstApps(apps);
      await this.selectAppsOrderLastUsage();
      console.log('terminou');
      if (this.state.stats && this.state.stats.length) {
        _.forEach(lastOpenedApps, function (lastOpenedAppKey, lastOpenedApp) {
          _.forEach(apps, function (appKey, app) {
            if ((app.packageName === lastOpenedApps.packageName) && (app.usageTime != lastOpenedApps.usageTime)) {
              lastOpenedApps[lastOpenedAppKey].usageInThisSession = app.usageTime - lastOpenedApps.usageTime;
              sqLiteAndroid.updateLastUsageApp(lastOpenedApps[lastOpenedAppKey]);
              sqLiteAndroid.insertAppLast(app);
            }
          });
        });
      } else {
        console.log('else');
        sqLiteAndroid.insertFirstApps(apps);
      }      
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    BackgroundTask.schedule({
      period: 900, // Aim to run every 15 min - more conservative on battery
    });

    // Optional: Check if the device is blocking background tasks or not
    this.checkStatus();
  }

  async checkStatus() {
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

  async selectAppsOrderLastUsage () {
    console.log('selectAppsOrderLastUsage');
    try {
      db.transaction((tx) => {
        let stats = [];
        tx.executeSql(`SELECT * from apps WHERE last = 1`, [], function (tx, data) {
          console.log('rows ' + data.rows.length)
          _.forEach(data.rows, function (table, key) {
            stats.push(data.rows.item(key));
          });
          this.setState({ stats });
        });
      }); 
    } catch(e) {
      console.log(e);
    }
  }

  getStats() {
    UsageStats.getAppsToday()
      .then(apps => {
        this.verifyIfOpen(apps);
        // this.selectAppsOrderLastUsage();
        this.setState({ isFetching: false });
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
        return (<AndroidNotifications/>);
      case 2:
        return (<AndroidPrizes/>);
      case 3: 
        return (<AndroidMyData/>);
      default:
        return (
        <View style={this.state.styles.notificationsContainer}>
          <ScrollView>
            <Text style={this.state.styles.fontWhite}> apiLevel {this.state.apiLevel} </Text>
            <Text style={this.state.styles.fontWhite}> appName {this.state.appName} </Text>
            <Text style={this.state.styles.fontWhite}> phoneBrand {this.state.phoneBrand} </Text>
            <Text style={this.state.styles.fontWhite}> phoneCarrier {this.state.phoneCarrier} </Text>
            <Text style={this.state.styles.fontWhite}> phoneModel {this.state.phoneModel} </Text>
            <Text style={this.state.styles.fontWhite}> phoneNumber {this.state.phoneNumber} </Text>
            <Text style={this.state.styles.fontWhite}> phoneManufacturer {this.state.phoneManufacturer} </Text>
            <Text style={this.state.styles.fontWhite}> systemName {this.state.systemName} </Text>
            <Text style={this.state.styles.fontWhite}> systemVersion {this.state.systemVersion} </Text>
            <Text style={this.state.styles.fontWhite}> timezone {this.state.timezone} </Text>
            <Text style={this.state.styles.fontWhite}> batteryLevel {this.state.batteryLevel} </Text>
            <Text style={this.state.styles.fontWhite}> ip {this.state.ip} </Text>
            <Text style={this.state.styles.fontWhite}> userAgent {this.state.userAgent} </Text>
            <Text style={this.state.styles.fontWhite}> airPlaneModeOn {this.state.airPlaneModeOn} </Text>
            <Text style={this.state.styles.fontWhite}> isEmulator {this.state.isEmulator} </Text>
            <Text style={this.state.styles.fontWhite}> isTablet {this.state.isTablet} </Text>
            <Text style={this.state.styles.fontWhite}> isLandscape {this.state.isLandscape} </Text>
            <Text style={this.state.styles.fontWhite}> deviceType {this.state.deviceType} </Text>
            <Text style={this.state.styles.fontWhite}> connectionInfo.type {this.state.connectionInfo.type} </Text>
            <Text style={this.state.styles.fontWhite}> connectionInfo.effectiveType {this.state.connectionInfo.effectiveType} </Text>
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

  onLayout(){
    this.setState({ styles: androidAppStyles.index() });
  }

  render() {
    return (
      <View 
        style={this.state.styles.container}
        onLayout={this.onLayout.bind(this)}
      >
        <StatusBar backgroundColor="#145cc7" barStyle="light-content" />
        <View style={this.state.styles.usageDiaryContainer}>
          <Text style={[this.state.styles.usageDiaryTitle, this.state.styles.fontPattern]}>Pesquisa</Text>
          <Text style={[this.state.styles.usageDiarySelectedDate, this.state.styles.fontPattern]}>{this.state.selectedDate}</Text>
        </View>
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
      </View>
    );
  }
}

AppRegistry.registerComponent('AndroidApp', () => AndroidApp);