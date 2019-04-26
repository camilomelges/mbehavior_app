import { createStackNavigator, createAppContainer } from 'react-navigation';
import AndroidLogin from './AndroidLogin';
import AndroidRegister from './AndroidRegister';
import AndroidForgotPassword from './AndroidForgotPassword';

const LoginRoutes = createStackNavigator({
  Login: {
    screen: AndroidLogin,
  },
  Register: {
      screen: AndroidRegister,
  },
  ForgotPassword: {
    screen: AndroidForgotPassword
  }
},{
    initialRouteName: 'Login',
    // headerMode: 'none',
    // navigationOptions: {
      // headerVisible: false,
    // }
});

const LoginNavigation = createAppContainer(LoginRoutes);

export { LoginNavigation };