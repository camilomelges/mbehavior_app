import React, { Component } from 'react';
import SqLiteAndroid from './SqLiteAndroid';
import unbImage from '../assets/images/unb2.jpg';
import logo from '../assets/images/logo.png';
import AwesomeAlert from 'react-native-awesome-alerts';
import { api } from '../config/api';

import {
  Text,
  Button,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  StatusBar,
  NetInfo,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const sqLiteAndroid = new SqLiteAndroid();

export default class AndroidLogin extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      email: 'teste@teste.com',
      password: 'testee',
      logged: null,
      alert: {
        show: false,
        showProgress: false,
        title: "AwesomeAlert",
        message: "I have a message for you!",
        closeOnTouchOutside: true,
        closeOnHardwareBackPress: false,
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: "No, cancel",
        confirmText: "Yes, delete it",
        confirmButtonColor: "#DD6B55",
      }
    }
  }

  componentWillMount = () => {
    this._isMounted = true;
  }

  componentDidMount = () => {
    if (this._isMounted) {
      sqLiteAndroid.vefiryIfUserIsLogged(logged => {
        console.log('aqui', logged)
        this.setState({ logged });
        const { navigate } = this.props.navigation;
        if (logged)
          navigate('HomeRoutes');
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLogin = () => {
    const { email, password } = this.state;

    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) 
        return this.showAlert(false, 'Atenção', 'Você não possuí conecção com a internet!', false);

      if (!email)
        return this.showAlert(false, 'Atenção', 'O campo E-mail é obrigatório!', false);
  
      if (!password)
        return this.showAlert(false, 'Atenção', 'O campo Senha é obrigatório!', false);

      return fetch(`${api.url}/users/login-api-app.json`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, full_metal_app_token: api.full_metal_app_token })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (!responseJson.ok && !responseJson.user)
          return this.showAlert(false, 'Atenção', responseJson.message, false);

        sqLiteAndroid.insertUser(responseJson.user.email, login => {
          this.setState({ logged: true });
          const { navigate } = this.props.navigation;
          navigate('HomeRoutes');
        });
      })
      .catch((error) => {
        alert(error);
      });
    });
  }

  onRegister = () => {
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) 
        return this.showAlert(false, 'Atenção', 'Você não possuí conecção com a internet!', false);

      const { navigate } = this.props.navigation;
      navigate('Register');
    });
  }

  onForgot = () => {
    alert('Forgot')
  }

  showAlert = (showProgress, title, message, showCancelButton) => {
    const { alert } = this.state;
    alert.show = true;
    alert.showProgress = showProgress;
    alert.title = title;
    alert.message = message;
    alert.showCancelButton = showCancelButton;

    this.setState({ alert });
  };

  hideAlert = () => {
    const { alert } = this.state;
    alert.show = false;
    this.setState({ alert });
  };

  renderComponent = () => {
    if (!this._isMounted || this.state.logged == null) {
      return (<View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={100} color="#0000ff" /></View>);
    } else {
      return(
        <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        {
          unbImage ?
            <ImageBackground source={unbImage}
              blurRadius={0.5}
              style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
              imageStyle={{ resizeMode: 'cover' }}>
              <View style={{ backgroundColor: '#00000069', flex: 1, padding: '15%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                style={{maxHeight: 150, maxWidth: 140, backgroundColor: 'transparent', marginBottom: 20}} blurRadius={1} source={logo} />
                {/* <Text style={{ fontSize: 70, fontWeight: 'bold', textShadowColor: '#000', textShadowOffset: { width: -1, height: 2 }, textShadowRadius: 10, color: '#003a82' }}>UnB</Text> */}
                <TextInput
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
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
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={this.onForgot.bind(this)}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={{ color: '#e4e4e4' }}>Esqueceu a senha?</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', marginTop: '5%' }}>
                  <Button
                    color='#0033ff'
                    title={'Login'}
                    onPress={this.onLogin.bind(this)}
                  />
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', paddingTop: '3%' }}>
                  <TouchableOpacity onPress={this.onRegister.bind(this)}
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text style={{ color: '#e4e4e4' }}>Não é cadastrado ainda?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            : null
        }
        <AwesomeAlert
        show={this.state.alert.show}
        showProgress={this.state.alert.showProgress}
        title={this.state.alert.title}
        message={this.state.alert.message}
        showCancelButton={this.state.alert.showCancelButton}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        cancelText='Cancel'
        confirmText='      Ok      '
        confirmButtonColor='#003a82'
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          this.hideAlert();
        }}
        titleStyle={{fontSize: 30}}
        messageStyle={{fontSize: 15}}
        contentContainerStyle={{width: '100%', justifyContent: 'center'}}
      />
      </View>
      );
    }
  }
  
  render = () => {
    return (this.renderComponent());
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
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#e4e4e4'
  },
});