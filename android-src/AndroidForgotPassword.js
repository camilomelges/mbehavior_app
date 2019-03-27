import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const androidAppStyles = new AndroidAppStyles();

import {
    Text,
    View
} from 'react-native';

export default class AndroidForgot extends Component {

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
    return (
        <View onLayout={this.onLayout.bind(this)}>
            <Text>Forgot</Text>
        </View>
    );
  }
}

// const styles = androidAppStyles.notifications();