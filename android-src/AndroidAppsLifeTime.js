import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import update from 'react-addons-update';
import SqLiteAndroid from './SqLiteAndroid';
import moment from 'moment';
import tx from 'moment-timezone';

const androidAppStyles = new AndroidAppStyles();
const sqLiteAndroid = new SqLiteAndroid();

import {
  FlatList,
  Text,
  View,
  Image
} from 'react-native';

export default class AndroidAppsLifeTime extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stats: sqLiteAndroid.selectAllFromApps(),
      styles: androidAppStyles.prizes()
    };
    sqLiteAndroid.selectAllFromApps((apps) => {
      console.log('ow');
      this.setState({ stats: apps});
      console.log(this.state.stats)
    })
  };

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
              const lastUsage = moment(new Date(item.usageInThisSession * 1000)).format('MM/DD/YYYY hh:MM');
              const years = moment.duration(item.totalActivedTime, 'milliseconds').asYears();
              const months = moment.duration(years - Math.floor(years), 'years').asMonths();
              const days = moment.duration(months - Math.floor(months), 'months').asDays();
              const totalActived = `${parseInt(years)} anos ${parseInt(months)} meses e ${parseInt(days)} dias`;
              const tHours = moment.duration(item.usageInThisSession, 'milliseconds').asHours();
              const tMinutes = moment.duration(tHours - Math.floor(tHours), 'hours').asMinutes();
              const tSeconds = moment.duration(tMinutes - Math.floor(tMinutes), 'minutes').asSeconds();
              const totalUsage = `${parseInt(tHours)} horas e ${parseInt(tMinutes)} minutos e ${parseInt(tSeconds)} segundos`;
                return (
                <View>
                  <Text>{item.id}</Text>
                  <Text>{item.packageName}</Text>
                  <Text>{item.last}</Text>
                  <Text>{totalUsage}</Text>
                </View>);
            }}
            />
        </View>
    );
  }
}

//const styles = androidAppStyles.prizes();