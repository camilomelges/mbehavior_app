import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  Text,
  View
} from 'react-native';

export default class AndroidPrizes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stats: [{
        id: '0',
        name: 'Premio de R$50,00',
        sortDate: '17/07/2019',
        description: 'Acumule pontos e ganhe R$50,00 em créditos na play store ou na app store.'
      },
      {
        id: '1',
        name: 'Premio de R$100,00',
        sortDate: '17/06/2019',
        description: 'Acumule pontos e ganhe R$100,00 em créditos na play store ou na app store.'
      },
      {
        id: '2',
        name: 'Premio de R$100,00',
        sortDate: '17/05/2019',
        description: 'Acumule pontos e ganhe R$100,00 em créditos na play store ou na app store.'
      },
      {
        id: '3',
        name: 'Premio de R$100,00',
        sortDate: '17/04/2019',
        description: 'Acumule pontos e ganhe R$100,00 em créditos na play store ou na app store.'
      }],
    };
  };

  render() {
    return (
        <View style={styles.notificationsContainer}>
            <View style={styles.notificationsContainerHeader}>
                <Text style={styles.fontPattern}>Premiações</Text>
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
                            <FontAwesome5 style={styles.notificationsIcon} solid name={'money-bill'}/>
                        </View>
                        <Text style={styles.mT5}>{item.name + '\nSorteio dia ' + item.sortDate}</Text>
                    </View>
                    <Text>{item.description}</Text>
                </View>);
            }}
            />
        </View>
    );
  }
}

const styles = androidAppStyles.prizes();