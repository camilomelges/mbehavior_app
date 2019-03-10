import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import update from 'react-addons-update';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView
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
            modalVisible: {$set: visible}
          }
        }
      )
    })
  }

  onLayout(){
    this.setState({ styles: androidAppStyles.prizes() });
  }

  render() {
    return (
        <View 
          style={[this.state.styles.notificationsContainer]}
          onLayout={this.onLayout.bind(this)}
          >
            <View style={[this.state.styles.notificationsContainerHeader]}>
                <Text style={[this.state.styles.fontPattern, {textAlignVertical: "center", textAlign: "center"}]}>Premiações</Text>
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
                      onRequestClose={() => {this.setModalVisible(item.id, false);}}>
                      <View style={{flex: 1, paddingTop: 15, paddingLeft: '3%', paddingRight: '3%', backgroundColor: '#009fff'}}>
                        <View style={{paddingLeft: '13%', paddingTop: 20, paddingRight: '13%', alignItems: 'center'}}>
                          <View style={{justifyContent: 'center', width: 150, height: 150, borderColor: '#FFF', borderWidth: 2, borderRadius: 8}}>
                              <FontAwesome5 style={{fontSize: 100, color: '#FFF', textAlign: 'center', fontWeight: 'bold'}} solid name={'trophy'}/>
                          </View>
                          <View style={{marginTop: 50, textAlignVertical: "center", textAlign: "center", paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#008c40', borderRadius: 8, minHeight: '55%', maxHeight: '55%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 1, elevation: 4}}>
                            {/* <View> */}
                            <ScrollView style={{borderColor: '#FFF', padding: '5%', borderWidth: 1, borderRadius: 8, minHeight: '100%', backgroundColor: '#00af50', maxHeight: '100%'}}>
                              <Text style={{fontSize: 22, color: '#FFF', textAlign: 'center', fontFamily: 'Merriweather Sans'}}>{`${item.name}\n`}</Text>
                              <Text style={{fontSize: 18, color: '#FFF', textAlign: 'center', fontFamily: 'Merriweather Sans'}}>{item.description}</Text>
                            </ScrollView>
                          </View>
                        </View>
                        <View style={{alignItems: 'flex-end', position: 'absolute', left: 0, right: 0, bottom: 7}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setModalVisible(item.id, false);
                            }}>
                            <View style={[this.state.styles.notificationsIconContainer, {borderRadius: 50, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 1, elevation: 4}]}>
                              <FontAwesome5 style={this.state.styles.notificationsIcon} solid name={'reply'}/>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                    <Text style={this.state.styles.fontWhite}>{item.description}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(item.id, true);
                      }}>
                      <View style={this.state.styles.inline}>
                        <View style={this.state.styles.notificationsIconContainer}>
                            <FontAwesome5 style={this.state.styles.notificationsIcon} solid name={'money-bill'}/>
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