import { createStackNavigator } from 'react-navigation-stack';
import {
  LoginScreen,
  RequiredCodeScreen,
  EnterCodeScreen,
  RegisterScreen
} from 'src/screens';

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
    },
    Register: {
      screen: RegisterScreen,
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
