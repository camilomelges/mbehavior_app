import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AndroidText from './AndroidText';

import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

export default class AndroidNotifications extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showNotificationList: {height: 0},
      show: true,
      forms: [{
        id: '0',
        name: 'Formulário educacional',
        description: 'Preencha esse formulário e ganhe um ticket para o próximo sorteio, quanto mais tickets mais chances de ganhar'
      },
      {
        id: '1',
        name: 'Formulário profissional',
        description: 'Preencha esse formulário e ganhe um ticket para o próximo sorteio, quanto mais tickets mais chances de ganhar'
      },
      {
        id: '2',
        name: 'Formulário de interesses',
        description: 'Preencha esse formulário e ganhe um ticket para o próximo sorteio, quanto mais tickets mais chances de ganhar'
      },
      {
        id: '3',
        name: 'Formulário x',
        description: 'Preencha esse formulário e ganhe um ticket para o próximo sorteio, quanto mais tickets mais chances de ganhar'
      }]
    };
  };

  showNotificationList = (show) => {
    if (show) {
      this.setState({ showNotificationList: {height: '100%'} });
    } else {
      this.setState({ showNotificationList: {height:  0} });
    }
    return this.setState({ show: !show });
  }

  render() {
    return (
      <View style={styles.notifications}>
        <TouchableOpacity onPress={() => this.showNotificationList(this.state.show)}>
        <View style={styles.notificationsHeader}>
          <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'envelope'} />
          <AndroidText>Notificações</AndroidText>
          <FontAwesome5 style={{fontSize: 20, color: '#fff', position: 'absolute', right: 0}} solid name={'chevron-right'} />
        </View>
        </TouchableOpacity>
        <View style={[styles.notificationsList, this.state.showNotificationList]}>
        <FlatList
          data={this.state.forms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <View>
                  <View style={styles.notificationsIconContainer}>
                    <FontAwesome5 style={styles.notificationsIcon} solid name={'comment-alt'} />
                  </View>
                  <AndroidText>{item.description}</AndroidText>
                </View>
                <AndroidText>{item.description}</AndroidText>
              </View>);
          }}
        />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  notifications: {
    flex: 1,
    borderBottomWidth: 1,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    borderBottomColor: '#fff',
    backgroundColor: '#7490d8',
    justifyContent: 'flex-start'
  },
  notificationsHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  notificationsList: {
    // height: 0
    height: '100%'
  }
});