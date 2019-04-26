import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AndroidRegisterForm from './AndroidRegisterForm';

const androidAppStyles = new AndroidAppStyles();

import {
    Text,
    View
} from 'react-native';

export default class AndroidRegister extends Component {

  constructor(props) {
    super(props);

    this.state = {
        form: {
            login: '',
            password: ''
        },
        styles: androidAppStyles.notifications()
    };
  };

  onLayout(){
    this.setState({ styles: androidAppStyles.notifications() });
  }

  render() {
    return (<AndroidRegisterForm/>);
  }
}

// const styles = androidAppStyles.notifications();