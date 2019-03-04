import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  Text,
  View
} from 'react-native';

export default class AndroidMyData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stats: [{
        id: '0',
        description: 'teste0'
      },
      {
        id: '1',
        description: 'teste1'
      },
      {
        id: '2',
        description: 'teste2'
      },
      {
        id: '3',
        description: 'teste3'
      }],
    };
  };

  render() {
    return (
        <View style={styles.notificationsContainer}>
            <View style={styles.notificationsContainerHeader}>
                <Text style={styles.fontPattern}>Meus dados</Text>
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