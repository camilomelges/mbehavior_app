import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const androidAppStyles = new AndroidAppStyles();

import {
  FlatList,
  Text,
  View
} from 'react-native';

export default class AndroidResearchData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      researchData: {
        name: 'Pesquisa tal',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        university: 'UNB'
      },
      styles: androidAppStyles.notifications()
    };
  };

  onLayout(){
    this.setState({ styles: androidAppStyles.notifications() });
  }

  render() {
    return (
        <View 
          style={this.state.styles.notificationsContainer}
          onLayout={this.onLayout.bind(this)}
          >
            <View style={this.state.styles.notificationsContainerHeader}>
                <Text style={this.state.styles.fontPattern}>Pesquisa</Text>
            </View>
            <View style={this.state.styles.notificationsContainerList}>
              <Text>{this.state.researchData.name}</Text>
              <Text>{this.state.researchData.description}</Text>
              <Text>{this.state.researchData.university}</Text>
            </View>
        </View>
    );
  }
}

// const styles = androidAppStyles.notifications();