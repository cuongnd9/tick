import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, RequiredCodeScreen } from 'src/screens';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    RequiredCode: {
      screen: RequiredCodeScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export default AuthNavigator;
