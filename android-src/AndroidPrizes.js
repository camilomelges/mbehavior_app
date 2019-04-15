import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import update from 'react-addons-update';
import trophyIcon45 from '../assets/images/trophy_icon_45.png';
import TrophyModalContent from './TrophyModalContent';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
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
      stats: [{
        id: '0',
        name: 'Premio de R$50,00',
        sortDate: '17/07/2019',
        description: 'Acumule pontos e ganhe R$50,00 em créditos na play store ou na app store.',
        modalVisible: false,
      },
      {
        id: '1',
        name: 'Premio de R$100,00',
        sortDate: '17/06/2019',
        description: 'Acumule pontos e ganhe R$100,00 em créditos na play store ou na app store.',
        modalVisible: false,
      },
      {
        id: '2',
        name: 'Premio de R$100,00',
        sortDate: '17/05/2019',
        description: 'Acumule pontos e ganhe R$100,00 em créditos na play store ou na app store.',
        modalVisible: false,
      },
      {
        id: '3',
        name: 'Premio de R$100,00',
        sortDate: '17/04/2019',
        description: 'Acumule pontos e ganhe R$100,00 em créditos na play store ou na app store.',
        modalVisible: false,
      }],
      styles: androidAppStyles.prizes()
    };
  };

  setModalVisible(id, visible) {
    this.setState({
      stats: update(
        this.state.stats, {
          [id]: {
            modalVisible: { $set: visible }
          }
        }
      )
    })
  }

  onLayout() {
    this.setState({ styles: androidAppStyles.prizes() });
  }

  render() {
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
          data={this.state.stats}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={this.state.styles.notificationsContainerListItem}>
                <Modal
                  animationType="fade"
                  transparent={false}
                  visible={item.modalVisible}
                  onRequestClose={() => { this.setModalVisible(item.id, false); }}>
                  {trophyIcon45 ?
                    <ImageBackground source={trophyIcon45}
                      style={{ width: '100%', height: '100%'}}
                      imageStyle={{ resizeMode: 'repeat', backgroundColor: '#009fff' }}>
                      <TrophyModalContent item={item}/>
                    </ImageBackground>
                    : null}
                </Modal>
                <Text style={this.state.styles.fontWhite}>{item.description}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(item.id, true);
                  }}>
                  <View style={this.state.styles.inline}>
                    <View style={this.state.styles.notificationsIconContainer}>
                      <FontAwesome5 style={this.state.styles.notificationsIcon} solid name={'money-bill'} />
                    </View>
                    <Text style={[this.state.styles.mT5, this.state.styles.fontWhite]}>{item.name + '\nSorteio dia ' + item.sortDate}</Text>
                  </View>
                </TouchableOpacity>
              </View>);
          }}
        />
      </View>
    );
  }
}

//const styles = androidAppStyles.prizes();