import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const androidAppStyles = new AndroidAppStyles();

import {
  Text,
  Animated,
  Easing,
  View,
  ScrollView
} from 'react-native';

spinValue = new Animated.Value(0);

const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
Animated.loop(
  Animated.timing(
    this.spinValue,
    {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }
  )).start()

export default class TrophyModalContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      styles: androidAppStyles.prizes()
    };
  };

  // setModalVisible(id, visible) {
  //     this.setState({
  //         stats: update(
  //             this.props.item, {
  //                 [id]: {
  //                     modalVisible: { $set: visible }
  //                 }
  //             }
  //         )
  //     })
  // }

  render() {
    return (
      <View style={this.state.styles.notificationsModalContainer}>
        <View style={this.state.styles.notificationsModalContainerHeader}>
          <View style={this.state.styles.notificationsModalContainerHeaderIcon}>
            <Animated.View style={{ transform: [{ rotateY: spin }] }}>
              <FontAwesome5 style={{ fontSize: 100, color: '#FFD700', textAlign: 'center', fontWeight: 'bold' }} solid name={'trophy'} />
            </Animated.View>
          </View>
          <View style={this.state.styles.notificationsModalContainerBody}>
            {/* <View> */}
            <ScrollView style={{ borderColor: '#FFF', padding: '5%', borderWidth: 1, borderRadius: 8, minHeight: '100%', backgroundColor: '#c7a800', maxHeight: '100%' }}>
              <Text style={{ fontSize: 22, color: '#FFF', textAlign: 'center', fontFamily: 'Merriweather Sans' }}>{`${this.props.item.name}\n`}</Text>
              <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center', fontFamily: 'Merriweather Sans' }}>{this.props.item.description}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', position: 'absolute', left: 0, right: 0, bottom: 7 }}>
          {/* <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(this.props.item.id, false);
                        }}>
                        <View style={[this.state.styles.notificationsIconContainer, { borderRadius: 50, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 1, elevation: 4 }]}>
                            <FontAwesome5 style={this.state.styles.notificationsIcon} solid name={'reply'} />
                        </View>
                    </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}