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
      this.setState({ showResearchList: {height: '83.5%'}, changeResearchFlex: {flex: 0.76 }});
    } else {
      this.setState({ showResearchList: {height: 0}, changeResearchFlex: {flex: 0.14 }});
    }
    return this.setState({ show: !show });
  }

  render() {
    return (
      <View style={[styles.research, this.state.changeResearchFlex]}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.showResearchList(this.state.show)}>
        <View style={styles.researchHeader}>
          <View style={{width: '100%', alignItems: 'center', flexDirection: 'row'}}>
            <View style={styles.fontCircle}>
              <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'search'} />
            </View>
            <AndroidText>Pesquisa</AndroidText>
            <FontAwesome5 style={{position: 'absolute', right: 0, fontSize: 20, color: '#fff'}} solid name={'chevron-right'} />
          </View>
        </View>
        </TouchableOpacity>
        <View style={this.state.showResearchList}></View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  research: {
    flex: 0.14,
    justifyContent: 'center',
    paddingRight: '5%',
    paddingLeft: '3%',
    paddingVertical: '2%',
    backgroundColor: '#3d69d6'
  },
  fontCircle: {
    marginRight: '2%',
    backgroundColor: '#aeaeb7',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 50
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