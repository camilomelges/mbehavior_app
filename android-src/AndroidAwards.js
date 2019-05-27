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
      showAwardsList: {height: 0},
      show: true,
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

  showAwardsList = (show) => {
    if (show) {
      this.setState({ showAwardsList: {height: '83.5%'}, changeAwardsFlex: {flex: 0.76 }});
    } else {
      this.setState({ showAwardsList: {height: 0}, changeAwardsFlex: {flex: 0.12 }});
    }
    return this.setState({ show: !show });
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
      <View style={[styles.awards, this.state.changeAwardsFlex]}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.showAwardsList(this.state.show)}>
        <View style={styles.awardsHeader}>
          <View style={{width: '100%', alignItems: 'center', flexDirection: 'row'}}>
            <View style={styles.fontCircle}>
              <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'trophy'} />
            </View>
            <AndroidText>Prêmios</AndroidText>
            <FontAwesome5 style={{position: 'absolute', right: 0, fontSize: 20, color: '#fff'}} solid name={'chevron-right'} />
          </View>
        </View>
        </TouchableOpacity>
        <View style={[styles.awardsList, this.state.showAwardsList]}>
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
                    <View style={styles.awardsIconContainer}>
                      <FontAwesome5 style={styles.awardsIcon} solid name={'money-bill'} />
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
    flex: 0.12,
    justifyContent: 'center',
    paddingRight: '5%',
    paddingLeft: '3%',
    paddingVertical: '2%',
    backgroundColor: '#8a9dd0'
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
  awardsHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  notificationsList: {
    // height: 0
    height: '100%'
  }
});