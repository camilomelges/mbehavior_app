import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const androidAppStyles = new AndroidAppStyles();

export default class AndroidHexagon extends Component {

  constructor(props) {
    super(props);

    this.state = {
      styles: androidAppStyles.index(),
    }
  }

  render = () => {
    return (
      <View>
        <View style={styles.hexagon}>
        <View style={styles.hexagonBefore} />
          <View style={styles.hexagonInner} />
          <View style={styles.hexagonAfter} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
          <View style={[styles.triangleLeft, this.props.style]}/>
          <View style={[styles.retangle, this.props.style, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
          <TouchableOpacity style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#fff', left: 5, height: '100%', width: '30%'}} onPress={() => console.log("aqui")} title="Notificações" accessibilityLabel="Notificações">
              <Text style={{fontFamily: 'Merriweather Sans', fontWeight: 'bold', color: '#fff'}}> Pesquisa </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: 'center', height: '100%'}} onPress={() => console.log("aqui")} title="Notificações" accessibilityLabel="Notificações">
            <Text style={{fontFamily: 'Merriweather Sans', fontWeight: 'bold', color: '#fff'}}> Prêmios </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff', right: 5, height: '100%', width: '30%'}} onPress={() => console.log("aqui")} title="Notificações" accessibilityLabel="Notificações">
            <Text style={{fontFamily: 'Merriweather Sans', fontWeight: 'bold', color: '#fff'}}> Notificações </Text>
            </TouchableOpacity>
            </View>
          <View style={[styles.triangleRight, this.props.style]}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hexagon: {
    width: '100%',
    height: '68%'
  },
  hexagonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#145cc7'
  },
  hexagonAfter: {
    left: 0,
    width: '100%',
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 172,
    borderLeftColor: 'transparent',
    borderRightWidth: 172,
    borderRightColor: 'transparent',
    borderTopWidth: 30,
    borderTopColor: '#145cc7'
  },
  hexagonBefore: {
    left: 0,
    width: '100%',
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 172,
    borderLeftColor: 'transparent',
    borderRightWidth: 172,
    borderRightColor: 'transparent',
    borderBottomWidth: 30,
    borderBottomColor: '#145cc7'
  },
  triangleLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderRightWidth: 6,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: '#145cc7',
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 6,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: '#145cc7',
  },
  retangle: {
    backgroundColor: '#145cc7',
    width:'92%',
    height:40
  },
  retangle2: {
    backgroundColor: '#145cc7',
    width:'100%',
    height:40
  }
});