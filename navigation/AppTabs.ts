import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-ui-kitten';
import { TaskScreen, AddTaskScreen, CategoryScreen } from '../screens';

const AppTabs = createBottomTabNavigator(
  {
    Task: TaskScreen,
    'Add Task': AddTaskScreen,
    Category: CategoryScreen
  },
  // {
  //   defaultNavigationOptions: ({ navigation }) => ({
  //     tabBarIcon: ({ focused, horizontal, tintColor }) => {
  //       const { routeName } = navigation.state;
  //       let iconName = '';
  //       switch (routeName) {
  //         case 'Task':
  //           iconName = `a${focused ? '' : '-outline'}`;
  //           break;
  //         case 'Add Task':
  //           iconName = `a${focused ? '' : '-outline'}`;
  //           break;
  //         default:
  //           iconName = `a${focused ? '' : '-outline'}`;
  //       }
  //       return <Icon name={iconName} height={25} fill={tintColor} />;
  //     }
  //   }),
  //   tabBarOptions: {
  //     activeTintColor: 'tomato',
  //     inactiveTintColor: 'gray'
  //   }
  // }
);

export default AppTabs;
