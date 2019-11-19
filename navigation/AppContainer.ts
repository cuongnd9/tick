import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './AuthStack';
import TaskStack from './TaskStack';
import AddTaskStack from './AddTaskStack';
import CategoryStack from './CategoryStack';
import OtherStack from './OtherStack';
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
      TaskStack,
      AddTaskStack,
      CategoryStack,
      OtherStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
