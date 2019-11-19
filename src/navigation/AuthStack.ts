import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from 'src/screens';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
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
