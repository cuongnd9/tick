import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AppTabs from './AppTabs';
import { AuthLoadingScreen } from '../screens';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: {
        screen: AuthLoadingScreen,
        navigationOptions: {
          header: null
        }
      },
      AuthStack,
      AppStack,
      AppTabs
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
