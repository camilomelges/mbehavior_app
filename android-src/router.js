import { createStackNavigator, createAppContainer } from 'react-navigation';
import AndroidLogin from './AndroidLogin';

const LoginRoutes = createStackNavigator({
  Login: {
    screen: AndroidLogin
  },
  Register: {
      screen: AndroidLogin
  },
  ForgotPassword: {
    screen: AndroidLogin
  }
},{
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const LoginNavigation = createAppContainer(LoginRoutes);

export { LoginNavigation };