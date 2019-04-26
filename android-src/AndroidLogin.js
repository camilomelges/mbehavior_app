import React, { Component } from 'react';
import SqLiteAndroid from './SqLiteAndroid';
import unbImage from '../assets/images/unb.jpg';
import AndroidInitialPage from './AndroidInitialPage';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
  Text,
  Button,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const sqLiteAndroid = new SqLiteAndroid();

export default class AndroidLogin extends Component {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);

    this.state = {
      username: '',
      password: '',
      logged: false,
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
    };

    sqLiteAndroid.vefiryIfUserIsLogged(logged => {
      console.log('logged', logged);
      this.setState({ isFetching: false });
      this.setState({ logged })
    });
  }

  onLogin = () => {
    const { username, password } = this.state;

    if (!username)
      return this.showAlert(false, 'Atenção', 'O campo E-mail é obrigatório!', false);

    if (!password)
      return this.showAlert(false, 'Atenção', 'O campo Senha é obrigatório!', false);

    sqLiteAndroid.insertUser(username, login => {
      console.log('login', login);
      this.setState({ logged: true });
    });
  }

  onRegister = () => {
    const { navigate } = this.props.navigation;
    navigate('Register');
    // alert('Register');
  }

  onForgot = () => {
    alert('Forgot')
  }

  showAlert = (showProgress, title, message, showCancelButton) => {
    const alert = this.state.alert;
    alert.show = true;
    alert.showProgress = showProgress;
    alert.title = title;
    alert.message = message;
    alert.showCancelButton = showCancelButton;

    this.setState({ alert });
  };

  hideAlert = () => {
    const alert = this.state.alert;
    alert.show = false;
    this.setState({ alert });
  };

  // _handleLoggedUser() {
  //   if (this.state.logged) {
  //     return (<AndroidInitialPage />);
  //   } else {
  //     return (
  //       <View style={styles.container}>
  //         <StatusBar translucent={true} backgroundColor={'transparent'} />
  //         {
  //           unbImage ?
  //             <ImageBackground source={unbImage}
  //               blurRadius={0.5}
  //               style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
  //               imageStyle={{ resizeMode: 'cover' }}>
  //               <View style={{ backgroundColor: '#00000069', flex: 1, padding: '15%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
  //                 <Text style={{ fontSize: 70, fontWeight: 'bold', textShadowColor: '#000', textShadowOffset: { width: -1, height: 2 }, textShadowRadius: 10, color: '#003a82' }}>UnB</Text>
  //                 <TextInput
  //                   value={this.state.username}
  //                   onChangeText={(username) => this.setState({ username })}
  //                   placeholder={'E-mail'}
  //                   style={styles.input}
  //                 />
  //                 <TextInput
  //                   value={this.state.password}
  //                   onChangeText={(password) => this.setState({ password })}
  //                   placeholder={'Senha'}
  //                   secureTextEntry={true}
  //                   style={styles.input}
  //                 />
  //                 <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
  //                   <TouchableOpacity onPress={this.onForgot.bind(this)}
  //                     style={{
  //                       flexDirection: 'column',
  //                       alignItems: 'flex-end',
  //                     }}>
  //                     <Text style={{ color: '#e4e4e4' }}>Esqueceu a senha?</Text>
  //                   </TouchableOpacity>
  //                 </View>
  //                 <View style={{ width: '100%', marginTop: '5%' }}>
  //                   <Button
  //                     color='#003a82'
  //                     title={'Login'}
  //                     onPress={this.onLogin.bind(this)}
  //                   />
  //                 </View>
  //                 <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', paddingTop: '3%' }}>
  //                   <TouchableOpacity onPress={this.onRegister.bind(this)}
  //                     style={{
  //                       flexDirection: 'column',
  //                     }}>
  //                     <Text style={{ color: '#e4e4e4' }}>Não é cadastrado ainda?</Text>
  //                   </TouchableOpacity>
  //                 </View>
  //               </View>
  //             </ImageBackground>
  //             : null
  //         }
  //         <AwesomeAlert
  //         show={this.state.alert.show}
  //         showProgress={this.state.alert.showProgress}
  //         title={this.state.alert.title}
  //         message={this.state.alert.message}
  //         showCancelButton={this.state.alert.showCancelButton}
  //         closeOnTouchOutside={true}
  //         closeOnHardwareBackPress={true}
  //         showConfirmButton={true}
  //         cancelText='Cancel'
  //         confirmText='      Ok      '
  //         confirmButtonColor='#003a82'
  //         onCancelPressed={() => {
  //           this.hideAlert();
  //         }}
  //         onConfirmPressed={() => {
  //           this.hideAlert();
  //         }}
  //         titleStyle={{fontSize: 30}}
  //         messageStyle={{fontSize: 15}}
  //         contentContainerStyle={{width: '100%', justifyContent: 'center'}}
  //       />
  //       </View>
  //     );
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        {
          unbImage ?
            <ImageBackground source={unbImage}
              blurRadius={0.5}
              style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
              imageStyle={{ resizeMode: 'cover' }}>
              <View style={{ backgroundColor: '#00000069', flex: 1, padding: '15%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 70, fontWeight: 'bold', textShadowColor: '#000', textShadowOffset: { width: -1, height: 2 }, textShadowRadius: 10, color: '#003a82' }}>UnB</Text>
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
                    color='#003a82'
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