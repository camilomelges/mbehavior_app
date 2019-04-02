import SQLite from 'react-native-sqlite-storage';
import _ from 'lodash';

const db = SQLite.openDatabase({ name: 'usageStatesDb.db' });

export default class SqLiteAndroid {
  createTableIfNotExists() {
    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE apps'
      );
      tx.executeSql(
        'CREATE TABLE apps(id INTEGER PRIMARY KEY AUTOINCREMENT, packageIcon TEXT, packageName TEXT, usageTime INT NOT NULL, lastUsageTime INT NOT NULL, usageInThisSession INT NOT NULL DEFAULT 0, last BIT NOT NULL DEFAULT 1, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
        []
      );
    });
  };

  selectAllFromApps() {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM apps", [], function (txn, data) {
        _.forEach(data.rows, function (app, key) {
          console.log(data.rows.item(key));
        });
      });
    })
  }

  insertFirstApps = async (apps, callback) => {
    console.log('insertFirstApps')
    _.forEach(apps, function (app, appKey) {
      db.transaction((tx) => {
          tx.executeSql(`INSERT INTO apps (packageIcon, packageName, usageTime, lastUsageTime, usageInThisSession) VALUES (
            "${app.packageIcon}", 
            "${app.packageName}", 
            "${app.usageTime}", 
            "${app.lastUsageTime}", 
            "${app.usageInThisSession}"
            )`, []);
      });
    });
    callback(apps);
  }

  getLastApps() {
    let lastOpenedApps = [];
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM apps WHERE last = 1", [], function (txn, data) {
        _.forEach(data.rows, function (app, key) {
          lastOpenedApps.push(data.rows.item(key));
        });
      });
      return lastOpenedApps;
    });
  }

  updateLastUsageApp(app, callback){
    db.transaction((tx) => {
      tx.executeSql(`UPDATE apps SET last = 0, usageInThisSession = ${app.usageInThisSession} WHERE id = "${app.id}"`, [], function (txn, data) {
        callback(app);
      })
    });
  }

  insertAppLast(app, callback) {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO apps (packageIcon, packageName, usageTime, lastUsageTime, usageInThisSession, last) VALUES (
        "${app.packageIcon}", 
        "${app.packageName}", 
        "${app.usageTime}", 
        "${app.lastUsageTime}", 
        "${app.usageInThisSession}",
        "${app.last}"
        )`, [], function (txn, data) {
          callback(app);
        })
    });
  }

  selectAppsOrderLastUsage () {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * from apps ORDER BY lastUsageTime DESC`, [], function (tx, data) {
        _.forEach(data.rows, function (table, key) {
          stats.push(data.rows.item(key))
        });
      });
    });
  }
};