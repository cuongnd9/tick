import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TaskScreen, AddTaskScreen, CategoryScreen } from '../screens';

const AppTabs = createBottomTabNavigator(
  {
    Task: TaskScreen,
    'Add Task': AddTaskScreen,
    Category: CategoryScreen
  },
  {
    tabBarOptions: {
      showIcon: true,
    }
  }
);

export default AppTabs;
