import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, RequiredCodeScreen, EnterCodeScreen } from 'src/screens';

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
    },
    EnterCode: {
      screen: EnterCodeScreen,
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
