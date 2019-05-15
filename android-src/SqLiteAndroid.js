import SQLite from 'react-native-sqlite-storage';
import _ from 'lodash';

const db = SQLite.openDatabase({ name: 'usageStatesResearchDb.db' });

export default class SqLiteAndroid {
  createTableIfNotExists = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS apps(id INTEGER PRIMARY KEY AUTOINCREMENT, packageName TEXT, totalActivedTime BIGINT UNSIGNED NOT NULL, initTimeInInterval BIGINT UNSIGNED NOT NULL, lastTimeUsed BIGINT UNSIGNED NOT NULL DEFAULT 0, usageTime BIGINT UNSIGNED NOT NULL DEFAULT 0, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
        []
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locations(id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp LONG, speed DOUBLE, heading DOUBLE, accuracy DOUBLE, longitude DOUBLE, altitude DOUBLE, latitude DOUBLE, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
        []
      );
      // this.dropTableUser(tx);
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT)',
        []
      );
    });
  };

  dropTableUser = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS user', []);
  }

  dropTableApps = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS apps', []);
  }

  dropTableLocations = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS locations', []);
  }

  selectAllFromApps = (callback) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM apps ORDER BY id ASC", [], function (txn, data) {
        let apps = [];
        _.forEach(data.rows, function (app, key) {
          apps.push(data.rows.item(key));
        });
        return callback(apps);
      });
    })
  }

  selectAllFromLocations = (callback) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM locations ORDER BY id ASC", [], function (txn, data) {
        let locations = [];
        _.forEach(data.rows, function (app, key) {
          locations.push(data.rows.item(key));
        });
        return callback(locations);
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
  vefiryIfUserIsLogged = (callback) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM user`, [], function (txn, data) {
        if (data.rows.length > 0)
          return callback(true);
        else
          return callback(false);
      });
    })
  }

  getUserEmail = async (callback) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT login FROM user`, [], function (txn, data) {
        let email;
        _.forEach(data.rows, function (app, key) {
          email = data.rows.item(key).login;
        });
        return callback(email);
      });
    });
  }

  insertUser = async (email, callback) => {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO user (login) VALUES ("${email}")`, [], function (txn, data) {
        return callback(email);
      });
    });
  }

  insertFirstApps = async (apps, callback) => {
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

  insertApp(app) {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO apps (packageName, totalActivedTime, initTimeInInterval, lastTimeUsed, usageTime) VALUES (
        "${app.packageName}", 
        "${app.totalActivedTime}", 
        "${app.initTimeInInterval}", 
        "${app.lastTimeUsed}", 
        "${app.usageTime}"
        )`, []);
    });
  }

  insertLocation(location) {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO locations (timestamp, speed, heading, accuracy, longitude, altitude, latitude) VALUES (
        "${location.timestamp}", 
        "${location.coords.speed}", 
        "${location.coords.heading}", 
        "${location.coords.accuracy}", 
        "${location.coords.longitude}",
        "${location.coords.altitude}",
        "${location.coords.latitude}"
        )`, []);
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