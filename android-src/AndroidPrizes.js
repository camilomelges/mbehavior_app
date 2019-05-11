import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import update from 'react-addons-update';
import trophyIcon45 from '../assets/images/trophy_icon_45.png';
import TrophyModalContent from './TrophyModalContent';
import moment from 'moment';
import _ from 'lodash';
import { api } from '../config/api';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  NetInfo,
  Text,
  View,
  Modal,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

export default class AndroidPrizes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      trophies: [],
      isFetching: false,
      styles: androidAppStyles.prizes()
    };

    this.getTrophies();
  };

  getTrophies = () => {
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected)
        return Alert.alert('Atenção. Você não possuí conecção com a internet!');

      return fetch(`${api.url}/trophies/getTrophies.json?full_metal_app_token=${api.full_metal_app_token}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('aqui');
          const { trophies } = responseJson;
          return this.setState({ trophies });
        })
        .catch((error) => {
          alert(error);
        });
    });
  }

  setModalVisible = (id, visible) => {
    console.log('id', this.state.trophies);
    this.setState(trophies => {
      let list = _.findIndex(trophies, function(trp) { 
        if (trp.id == id) {
          trp.modalVisible = visible;
        }
      });
      return { list };
    });
  }

  onLayout() {
    this.setState({ styles: androidAppStyles.prizes() });
  }

  render() {
    console.log(this.state.trophies);
    return (
      <View
        style={[this.state.styles.notificationsContainer]}
        onLayout={this.onLayout.bind(this)}
      >
        <View style={[this.state.styles.notificationsContainerHeader]}>
          <Text style={[this.state.styles.fontPattern, { textAlignVertical: "center", textAlign: "center" }]}>Premiações</Text>
        </View>
        <FlatList
          style={this.state.styles.notificationsContainerList}
          data={this.state.trophies}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={this.state.styles.notificationsContainerListItem}>
                <Modal
                  animationType="fade"
                  transparent={false}
                  visible={item.modalVisible == 0 ? false : true}
                  onRequestClose={() => { this.setModalVisible(item.id, 0); }}>
                  {
                    trophyIcon45 ?
                      <ImageBackground source={trophyIcon45}
                        style={{ width: '100%', height: '100%' }}
                        imageStyle={{ resizeMode: 'repeat', backgroundColor: '#009fff' }}>
                        <TrophyModalContent item={item} />
                      </ImageBackground>
                      : null
                  }
                </Modal>
                <Text style={this.state.styles.fontWhite}>{item.description}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(item.id, 1);
                  }}>
                  <View style={this.state.styles.inline}>
                    <View style={this.state.styles.notificationsIconContainer}>
                      <FontAwesome5 style={this.state.styles.notificationsIcon} solid name={'money-bill'} />
                    </View>
                    <Text style={[this.state.styles.mT5, this.state.styles.fontWhite]}>{item.name + '\nSorteio dia ' + moment(item.sortDate).format('DD/MM/YYYY')}</Text>
                  </View>
                </TouchableOpacity>
              </View>);
          }}
        />
      </View>
    );
  }
}