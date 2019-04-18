import React, { Component } from 'react';
import { LoginNavigation } from "./android-src/router";

import {
  AppRegistry,
} from 'react-native';

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

export default class AndroidApp extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <LoginNavigation/>
    )
  }
}

AppRegistry.registerComponent('AndroidApp', () => AndroidApp);