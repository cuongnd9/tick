import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBarIcon } from 'src/components';
import TaskStack from './TaskStack';
import AddTaskStack from './AddTaskStack';
import CategoryStack from './CategoryStack';

const AppTabs = createBottomTabNavigator(
  {
    TaskStack: {
      screen: TaskStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='compass'
            height={32}
            width={32}
          />
        )
      }
    },
    AddTaskStack: {
      screen: AddTaskStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='plus-square'
            height={48}
            width={48}
          />
        )
      }
    },
    CategoryStack: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name='grid' height={32} width={32} />
        )
      }
    }
  },
  {
    initialRouteName: 'TaskStack',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
    },
    lazy: true,
  }
);

export default AppTabs;
