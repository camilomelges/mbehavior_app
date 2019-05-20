import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import update from 'react-addons-update';
import unbImage from '../assets/images/unb2.jpg';
import trophyIcon45 from '../assets/images/trophy_icon_45.png';
import TrophyModalContent from './TrophyModalContent';
import moment from 'moment';
import _ from 'lodash';
import { api } from '../config/api';
import AndroidText from './AndroidText';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  NetInfo,
  Text,
  View,
  StyleSheet,
  Modal,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

export default class AndroidPrizes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      awards: [],
      isFetching: false
    };

    this.getAwards();
  };

  getAwards = () => {
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
          const { awards } = responseJson;
          return this.setState({ awards });
        })
        .catch((error) => {
          alert(error);
        });
    });
  }

  setModalVisible = (id, visible) => {
    console.log('id', this.state.awards);
    this.setState(awards => {
      let list = _.findIndex(awards, function (trp) {
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
    return (
      <View style={styles.awards}>
        <View style={styles.awardsHeader}>
        <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'trophy'} />
          <AndroidText>Prêmios</AndroidText>
          <FontAwesome5 style={{fontSize: 20, color: '#fff', position: 'absolute', right: 0}} solid name={'chevron-right'} />
        </View>
        <View style={styles.awardsList}>
        <FlatList
          data={this.state.awards}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.awardsListItem}>
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
                <AndroidText>{item.description}</AndroidText>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(item.id, 1);
                  }}>
                  <View style={styles.inline}>
                    <View style={styles.notificationsIconContainer}>
                      <FontAwesome5 style={styles.notificationsIcon} solid name={'money-bill'} />
                    </View>
                    <AndroidText>{item.name + '\nSorteio dia ' + moment(item.sortDate).format('DD/MM/YYYY')}</AndroidText>
                  </View>
                </TouchableOpacity>
              </View>);
          }}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  awards: {
    borderBottomWidth: 1,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    backgroundColor: '#9daed8',
    borderBottomColor: '#fff',
    justifyContent: 'flex-start'
  },
  awardsHeader: {
    flex: 1,
    flexDirection: 'row',
  },
});