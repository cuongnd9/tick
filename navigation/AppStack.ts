import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../screens';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default AppNavigator;
