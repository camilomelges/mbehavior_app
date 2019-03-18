import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'usageStatesDb.db' });

export default class SqLiteAndroid {
  createTableIfNotExists() {
    db.transaction((tx) => {
      // tx.executeSql(
      //   'DROP TABLE IF EXISTS apps'
      // );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS apps(id INTEGER PRIMARY KEY AUTOINCREMENT, packageIcon TEXT, packageName TEXT, usageTime INT NOT NULL, lastUsageTime INT NOT NULL, usageInThisSession INT NOT NULL DEFAULT 0, last BIT NOT NULL DEFAULT 1, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
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

  insertFirstApps(apps) {
    console.log('insertFirstApps')
    db.transaction((tx) => {
      _.forEach(apps, function (app, appKey) {
        tx.executeSql(`INSERT INTO apps (packageIcon, packageName, usageTime, lastUsageTime, usageInThisSession, last) VALUES (
          "${app.packageIcon}", 
          "${app.packageName}", 
          "${app.usageTime}", 
          "${app.lastUsageTime}", 
          "${app.usageInThisSession}"
          "${app.last}"
          )`, []);
      });
    });
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

  updateLastUsageApp(app){
    db.transaction((tx) => {
      let stats = [];
      tx.executeSql(`UPDATE apps SET last = 0, usageInThisSession = app.usageInThisSession WHERE id = "${app.id}"`, [], function (txn, data) {
      })
      this.setState({ stats })
    });
  }

  insertAppLast(app) {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO apps (packageIcon, packageName, usageTime, lastUsageTime, usageInThisSession, last) VALUES (
        "${app.packageIcon}", 
        "${app.packageName}", 
        "${app.usageTime}", 
        "${app.lastUsageTime}", 
        "${app.usageInThisSession}"
        "${app.last}"
        )`, []);
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