import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  Text,
  View
} from 'react-native';

export default class AndroidNotifications extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stats: [{
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
      }],
    };
  };

  render() {
    return (
        <View style={styles.notificationsContainer}>
            <View style={styles.notificationsContainerHeader}>
                <Text style={styles.fontPattern}>Notificações</Text>
            </View>
            <FlatList
            style={styles.notificationsContainerList}
            data={this.state.stats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                <View style={styles.notificationsContainerListItem}>
                    <View style={styles.inline}>
                        <View style={styles.notificationsIconContainer}>
                            <FontAwesome5 style={styles.notificationsIcon} solid name={'comment-alt'}/>
                        </View>
                        <Text>{item.description}</Text>
                    </View>
                    <Text>{item.description}</Text>
                </View>);
            }}
            />
        </View>
    );
  }
}

const styles = androidAppStyles.notifications();