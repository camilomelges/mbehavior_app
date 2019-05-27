import React, { Component } from 'react';
import moment from 'moment';
import tx from 'moment-timezone';
import AndroidText from './AndroidText';

import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native';

export default class AndroidStatusBarAndHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {
    return (
      <View style={styles.androidStatusBarAndHeader}>
        <StatusBar backgroundColor="#274394" barStyle="light-content" />
        <View style={styles.header}>
          <AndroidText style={styles.headerTitle}>mBehaviorApp</AndroidText>
          <AndroidText style={styles.headerToday}>{moment().tz('America/Cuiaba').format('DD/MM/YYYY')}</AndroidText>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  androidStatusBarAndHeader: {
    flex: 1,
    backgroundColor: '#274394',
    paddingTop: 25,
    paddingLeft: '3%'
  },
  header: {
    flex: 1,
    flexDirection: 'row'
  },
  headerTitle: {
    marginRight: 10
  },
  headerToday: {
    textAlign: 'center',
    borderColor: '#FFF'
  }
});