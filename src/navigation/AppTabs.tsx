import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TabBarIcon } from 'src/components';
import TaskStack from './TaskStack';
import NewTaskStack from './NewTaskStack';
import CategoryStack from './CategoryStack';

const AppTabs = createBottomTabNavigator(
  {
    TaskStack: {
      screen: TaskStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name='cube' height={32} width={32} />
        )
      }
    },
    NewTaskStack: {
      screen: NewTaskStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='plus-circle'
            height={54}
            width={54}
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
      style: {
        borderTopColor: 'transparent',
        height: 80
      }
    },
    lazy: true
  }
);

export default AppTabs;
