import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AndroidText from './AndroidText';

import {
  View,
  StyleSheet
} from 'react-native';

export default class AndroidResearch extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {
    return (
      <View style={styles.research}>
        <View style={styles.researchHeader}>
        <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'search'} />
          <AndroidText>Pesquisa</AndroidText>
          <FontAwesome5 style={{fontSize: 20, color: '#fff', position: 'absolute', right: 0}} solid name={'chevron-right'} />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  research: {
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
});