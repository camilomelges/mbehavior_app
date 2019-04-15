import React, { Component } from 'react';
import SqLiteAndroid from './SqLiteAndroid';
import unbImage from '../assets/images/unb.jpg';
import unbLogo from '../assets/images/unb_logo.svg.png';

import {
  Text,
  Button,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const sqLiteAndroid = new SqLiteAndroid();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      logged: false
    };
  }

  onLogin() {
    const { username, password } = this.state;

    sqLiteAndroid.insertUser(username, login => {
      console.log('login', login);
      this.setState({ logged: true });
    });
  }

  onRegister() {
    alert('Register')
  }

  onForgot() {
    alert('Forgot')
  }

  render() {
    return (
      <View style={styles.container}>
        {
          unbLogo ?
            <ImageBackground source={unbLogo}
              style={{ width: '100%', flex: 1 }}
              imageStyle={{ resizeMode: 'cover' }}>
            </ImageBackground>
            : null
        }
        {
          unbImage ?
            <ImageBackground source={unbImage}
              style={{ flex: 2.8, width: '100%', alignItems: 'center', paddingTop: '5%' }}
              imageStyle={{ resizeMode: 'cover' }}>
              <Text style={{ fontSize: 70, fontWeight: 'bold', textShadowColor: '#000', textShadowOffset: {width: -1, height: 2}, textShadowRadius: 10, color: '#003a82' }}>UnB</Text>
              <View style={{ backgroundColor: '#ffffffde', padding: '5%', width: '85%' }}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'E-mail'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Senha'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Login'}
          onPress={this.onLogin.bind(this)}
        />
        <View style={{ flexDirection: 'row', paddingTop: '3%' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              width: '50%',
              padding: 10,
              alignItems: 'center',
              marginBottom: 10,
            }}
            onPress={this.onRegister.bind(this)}>
            <Text>Não tem conta?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onForgot.bind(this)} 
            style={{
              width: '50%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 10,
              marginBottom: 10,
            }}>
            <Text>Esqueceu a senha?</Text>
          </TouchableOpacity>
          </View>
        </View>
            </ImageBackground>
            : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#e4e4e4',
    borderColor: 'black',
    marginBottom: 10,
  },
});