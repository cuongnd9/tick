import { createStackNavigator } from 'react-navigation-stack';
import { ProfileScreen } from 'src/screens';

const OtherNavigator = createStackNavigator(
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

export default OtherNavigator;
