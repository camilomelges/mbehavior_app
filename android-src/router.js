import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import AndroidLogin from './AndroidLogin';
import AndroidRegister from './AndroidRegister';
import AndroidForgotPassword from './AndroidForgotPassword';
import AndroidInitialPage from './AndroidInitialPage';

const LoginRoutes = createStackNavigator({
  Login: {
    screen: AndroidLogin
  },
  Register: {
    screen: AndroidRegister
  },
  ForgotPassword: {
    screen: AndroidForgotPassword
  }
}, {
    initialRouteName: 'Login',
    // headerMode: 'none',
    // navigationOptions: {
    //   headerVisible: false,
    // }
  });

const HomeRoutes = createStackNavigator({
  Home: {
    screen: AndroidInitialPage
  }
}, {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

const LoginNavigation = createAppContainer(createDrawerNavigator({
  LoginRoutes: LoginRoutes,
  HomeRoutes: HomeRoutes
}));
// const HomeNavigation = createAppContainer(HomeRoutes);

export { LoginNavigation };