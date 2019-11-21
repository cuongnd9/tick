import { createStackNavigator } from 'react-navigation-stack';
import { TaskScreen, SearchTaskScreen } from 'src/screens';

const TaskNavigator = createStackNavigator(
  {
    Task: {
      screen: TaskScreen,
      navigationOptions: {
        header: null
      }
    },
    SearchTask: {
      screen: SearchTaskScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Task'
  }
);

export default TaskNavigator;
