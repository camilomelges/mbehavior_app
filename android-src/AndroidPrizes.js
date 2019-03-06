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
      styles: androidAppStyles.prizes()
    };
  };

  onLayout(){
    this.setState({ styles: androidAppStyles.prizes() });
  }

  render() {
    return (
        <View 
          style={this.state.styles.notificationsContainer}
          onLayout={this.onLayout.bind(this)}
          >
            <View style={this.state.styles.notificationsContainerHeader}>
                <Text style={this.state.styles.fontPattern}>Premiações</Text>
            </View>
            <FlatList
            style={this.state.styles.notificationsContainerList}
            data={this.state.stats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                <View style={this.state.styles.notificationsContainerListItem}>
                    <View style={this.state.styles.inline}>
                        <View style={this.state.styles.notificationsIconContainer}>
                            <FontAwesome5 style={this.state.styles.notificationsIcon} solid name={'money-bill'}/>
                        </View>
                        <Text style={this.state.styles.mT5}>{item.name + '\nSorteio dia ' + item.sortDate}</Text>
                    </View>
                    <Text>{item.description}</Text>
                </View>);
            }}
            />
        </View>
    );
  }
}

//const styles = androidAppStyles.prizes();