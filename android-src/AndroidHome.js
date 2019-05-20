import React, { Component } from 'react';
import AndroidStatusBarAndHeader from './AndroidStatusBarAndHeader';
import AndroidForms from './AndroidForms';
import AndroidAwards from './AndroidAwards';
import AndroidFooter from './AndroidFooter';
import AndroidResearch from './AndroidResearch';

import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class AndroidHome extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  };

  componentDidMount() {
    this.setState({ isFetching: false });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.getStats() });
  }

  render() {
    return (
      <View style={[styles.appHome]}>
        <View style={{ flex: 0.13 }}>
          <AndroidStatusBarAndHeader />
        </View>
        <View style={styles.homeScrollView}>
            <AndroidResearch />
            <AndroidForms />
            <AndroidAwards />
        </View>
        <AndroidFooter />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  appHome: {
    backgroundColor: '#45c0ef',
    flex: 1,
    height: '100%'
  },
  homeScrollView: {
    flex: 0.7
  }
});