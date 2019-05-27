import React, { Component } from 'react';
import logo from '../assets/images/logo_animation.gif';
import AndroidText from './AndroidText';

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
        <Image style={{height: 90, width: 120}} blurRadius={0} source={logo} />
        <AndroidText style={{color: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, textShadowColor: '#000'}}>Parabéns, você esta contruindo para a ciência à 20 dias</AndroidText>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  appFooter: {
    flex: 0.3,
    justifyContent: 'center',
    paddingBottom: 20,
    alignItems: 'center'
  }
});