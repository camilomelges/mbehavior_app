import SQLite from 'react-native-sqlite-storage';
import _ from 'lodash';

const db = SQLite.openDatabase({ name: 'usageStatesResearchDb.db' });

export default class SqLiteAndroid {
  createTableIfNotExists() {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS apps(id INTEGER PRIMARY KEY AUTOINCREMENT, packageIcon TEXT, packageName TEXT, usageTime BIGINT UNSIGNED NOT NULL, lastUsageTime BIGINT UNSIGNED NOT NULL, usageInThisSession BIGINT UNSIGNED NOT NULL DEFAULT 0, last BIT NOT NULL DEFAULT 1, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
        []
      );
      // tx.executeSql(
      //   'DROP TABLE IF EXISTS user;',
      //   []
      // );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT)',
        []
      );
    });
  };

  selectAllFromApps(callback) {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM apps WHERE last = 0 ORDER BY id DESC", [], function (txn, data) {
        let apps = [];
        _.forEach(data.rows, function (app, key) {
          apps.push(data.rows.item(key));
        });
        callback(apps);
      });
    })
  }

  selectAppForName(packageName, callback) {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM apps WHERE packageName like ${packageName}`, [], function (txn, data) {
        if (data.rows.length > 0)
          return callback(true);
        else
          return callback(false);
      });
    })
  }

  vefiryIfUserIsLogged(callback) {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM user`, [], function (txn, data) {
        console.log('verify user', data.rows.length);
        _.forEach(data.rows, function (app, key) {
          console.log(data.rows.item(key));
        });
        if (data.rows.length > 0)
          return callback(true);
        else
          return callback(false);
      });
    })
  }

  insertUser = async (email, callback) => {
    db.transaction((tx) => {
      console.log('insertUser', email);
      tx.executeSql(`INSERT INTO user (login) VALUES ("${email}")`, [], function (txn, data) {
        console.log('email', email);
        return callback(email);
      });
    });
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

  updateLastUsageApp(lastOpenedApp, callback) {
    db.transaction((tx) => {
      tx.executeSql(`UPDATE apps SET last = 0, usageInThisSession = ${lastOpenedApp.usageInThisSession} WHERE id = "${lastOpenedApp.id}"`, [], function (txn, data) {
        callback(lastOpenedApp);
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
        "1"
        )`, [], function (txn, data) {
          callback(app);
        })
    });
  }

  selectAppsOrderLastUsage() {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * from apps ORDER BY lastUsageTime DESC`, [], function (tx, data) {
        _.forEach(data.rows, function (table, key) {
          stats.push(data.rows.item(key))
        });
      });
    });
  }
};