import React, { Component } from 'react';
import mbappicon from '../assets/images/mbappicon.png';

import {
  View,
  StyleSheet,
  Image
} from 'react-native';

export default class AndroidFooter extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  };
  
  render() {
    return (
      <View style={[styles.appFooter]}>
        <Image style={{height: 150, width: 140}} blurRadius={1} source={mbappicon} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  appFooter: {
    height: 200,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});