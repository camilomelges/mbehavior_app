import React, { Component } from 'react';
import { LoginNavigation, HomeNavigation } from './android-src/router';
import { AppRegistry, ActivityIndicator, NetInfo, View, NativeModules } from 'react-native';
import SqLiteAndroid from './android-src/SqLiteAndroid';
import AndroiPermissions from './android-src/AndroidPermissions';
import BackgroundFetch from "react-native-background-fetch";
import { api } from './config/api';

const sqLiteAndroid = new SqLiteAndroid();
const androiPermissions = new AndroiPermissions();

const UsageStats = NativeModules.UsageStats;

export default class AndroidApp extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      logged: null
    }

    sqLiteAndroid.createTableIfNotExists();
  };

  componentWillMount = () => {
    this._isMounted = true;
  }

  async componentDidMount() {
    if (this._isMounted) {
      await this.backgroundFecth();
      sqLiteAndroid.vefiryIfUserIsLogged(logged => {
        this.setState({ logged });
      });
    }
  }

  async backgroundFecth() {
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: true,   // <-- Android-only,
      startOnBoot: true,         // <-- Android-only
      enableHeadless: true,
      forceReload: false
    }, () => {
      console.log("[js] Received background-fetch event");
      this.sendDataForApi();
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  }

  sendDataForApi = () => {
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected)
        return;

      sqLiteAndroid.getUserEmail((email) => {
        if (!email)
          return;

          sqLiteAndroid.selectAllFromLocations((locations) => {
            sqLiteAndroid.selectAllFromApps((apps) => {
              return fetch(`${api.url}/users/save-data.json`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, apps: apps, locations: locations, full_metal_app_token: api.full_metal_app_token })
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log('Terminou de salvar os dados');
                  //Se não der nenhum erro, excluir todo o historico do banco.
                  //Se der erro, salvar no banco o erro.
                })
                .catch((error) => {
                  alert(error);
                });
            });
          });
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderComponent = () => {
    if (!this._isMounted || this.state.logged == null) {
      return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size={100} color="#0000ff" /></View>);
    } else {
      return (<LoginNavigation />);
    }
  }

  render() {
    return (this.renderComponent());
  }
}

const LogLocation = async (data) => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    sqLiteAndroid.insertLocation(position);
  });
}

const LauchApp = async (data) => {
  console.log('LauchApp');
  UsageStats.getActualApp()
    .then(app => {
      sqLiteAndroid.insertApp(app);
    })
    .catch(error => {
      console.log(error);
    });
}

AppRegistry.registerHeadlessTask('LogLocation', () => LogLocation);
AppRegistry.registerHeadlessTask('LauchApp', () => LauchApp);

AppRegistry.registerComponent('AndroidApp', () => AndroidApp);