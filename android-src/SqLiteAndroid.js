import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'usageStatesDb.db' });

export default class SqLiteAndroid {
  createTableIfNotExists() {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS apps(id INTEGER PRIMARY KEY AUTOINCREMENT, packageIcon TEXT, packageName TEXT, usageTime INT NOT NULL, created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)',
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
};