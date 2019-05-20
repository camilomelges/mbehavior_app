import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class AndroidText extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Text style={[styles.fontPattern,this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  fontPattern: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Merriweather Sans'
  }
});