import { createStackNavigator } from 'react-navigation-stack';
import { TaskScreen } from 'src/screens';

const TaskNavigator = createStackNavigator(
  {
    Task: {
      screen: TaskScreen,
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
