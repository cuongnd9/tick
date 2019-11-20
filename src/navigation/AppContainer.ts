import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import OtherStack from './OtherStack';
import { AuthLoadingScreen } from 'src/screens';

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
      AppTabs,
      OtherStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
