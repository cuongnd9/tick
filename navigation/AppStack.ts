import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../screens';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default AppNavigator;
