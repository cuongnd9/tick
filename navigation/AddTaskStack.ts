import { createStackNavigator } from 'react-navigation-stack';
import { AddTaskScreen } from '../screens';

const AddTaskNavigator = createStackNavigator(
  {
    AddTask: {
      screen: AddTaskScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'AddTask'
  }
);

export default AddTaskNavigator;
