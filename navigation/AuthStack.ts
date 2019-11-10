import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens';

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login'
  }
);

export default AuthNavigator;
