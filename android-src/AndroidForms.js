import React, { Component } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AndroidText from './AndroidText';

import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

export default class AndroidForms extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showFormsList: {height: 0},
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

  showFormsList = (show) => {
    if (show) {
      this.setState({ showFormsList: {height: '83.5%'}, changeFormsFlex: {flex: 0.76 }});
    } else {
      this.setState({ showFormsList: {height: 0}, changeFormsFlex: {flex: 0.12 }});
    }
    return this.setState({ show: !show });
  }

  render() {
    return (
      <View style={[styles.forms, this.state.changeFormsFlex]}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.showFormsList(this.state.show)}>
        <View style={styles.formsHeader}>
          <View style={{width: '100%', alignItems: 'center', flexDirection: 'row'}}>
            <View style={styles.fontCircle}>
              <FontAwesome5 style={{fontSize: 20, color: '#fff', marginRight: '2%'}} solid name={'book-open'} />
            </View>
            <AndroidText>Formulários</AndroidText>
            <FontAwesome5 style={{position: 'absolute', right: 0, fontSize: 20, color: '#fff'}} solid name={'chevron-right'} />
          </View>
        </View>
        </TouchableOpacity>
        <View style={this.state.showFormsList}>
        <FlatList
          data={this.state.forms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <View>
                  <View style={styles.formsIconContainer}>
                    <FontAwesome5 style={styles.formsIcon} solid name={'comment-alt'} />
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
  forms: {
    flex: 0.12,
    justifyContent: 'center',
    paddingRight: '5%',
    paddingLeft: '3%',
    paddingVertical: '2%',
    backgroundColor: '#5c7fd6'
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
  formsHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  formsList: {
    // height: 0
    height: '100%'
  }
});