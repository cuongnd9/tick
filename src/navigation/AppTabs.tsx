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
            height={52}
            width={52}
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
    initialRouteName: 'NewTaskStack',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        borderTopColor: 'transparent'
      }
    },
    lazy: true
  }
);

export default AppTabs;
