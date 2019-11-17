import { createStackNavigator } from 'react-navigation-stack';
import { ProfileScreen } from '../screens';

const AppNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: 'Profile'
  }
);

export default AppNavigator;
