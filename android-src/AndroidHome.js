import React, { Component } from 'react';
import AndroidStatusBarAndHeader from './AndroidStatusBarAndHeader';
import AndroidNotifications from './AndroidNotifications';
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
        <View style={{ flex: 0.1 }}>
          <AndroidStatusBarAndHeader />
        </View>
        <View style={styles.homeScrollView}>
          <ScrollView contentContainerStyle={{}}>
            <AndroidResearch />
            <AndroidNotifications />
            <AndroidAwards />
            <AndroidFooter />
          </ScrollView>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  appHome: {
    backgroundColor: 'red',
    flex: 1,
    height: '100%'
  },
  homeScrollView: {
    backgroundColor: '#84cfec',
    flex: 0.9
  }
});