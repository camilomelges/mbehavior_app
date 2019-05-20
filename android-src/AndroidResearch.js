import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AndroidText from './AndroidText';

import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class AndroidResearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showResearchList: {height: 0},
      show: true
    };
  };

  showResearchList = (show) => {
    if (show) {
      this.setState({ showResearchList: {height: '100%'} });
    } else {
      this.setState({ showResearchList: {height:  0} });
    }
    return this.setState({ show: !show });
  }

  render() {
    return (
      <View style={styles.research}>
        <TouchableOpacity onPress={() => this.showResearchList(this.state.show)}>
        <View style={styles.researchHeader}>
          <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'search'} />
          <AndroidText>Pesquisa</AndroidText>
          <FontAwesome5 style={{fontSize: 20, color: '#fff', position: 'absolute', right: 0}} solid name={'chevron-right'} />
        </View>
        </TouchableOpacity>
        <View style={[styles.notificationsText, this.state.showResearchList]}></View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  research: {
    flex: 1,
    borderBottomWidth: 1,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    borderBottomColor: '#fff',
    backgroundColor: '#4972dc',
    justifyContent: 'flex-start'
  },
  researchHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  notificationsText: {
    // height: 0
    height: '100%'
  }
});