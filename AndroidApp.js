import React, { Component } from 'react';
import AndroidInitialPage from './android-src/AndroidInitialPage';
import { LoginNavigation, HomeNavigation } from './android-src/router';
import { AppRegistry } from 'react-native';
import SqLiteAndroid from './android-src/SqLiteAndroid';

const sqLiteAndroid = new SqLiteAndroid();

export default class AndroidApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logged: false
    }

    sqLiteAndroid.createTableIfNotExists();
  };

  componentWillMount = () => {
    this._isMounted = true;
  }

  componentDidMount = () => {
    if (this._isMounted) {
      sqLiteAndroid.vefiryIfUserIsLogged(logged => {
        this.setState({ logged });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <LoginNavigation/>
    )
  }
}

AppRegistry.registerComponent('AndroidApp', () => AndroidApp);