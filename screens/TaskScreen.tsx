import React from 'react';
import { NavigationBottomTabScreenComponent } from 'react-navigation-tabs';
import { Layout, Text, Icon } from 'react-native-ui-kitten';

const TaskScreen: NavigationBottomTabScreenComponent = () => {
  return (
    <Layout>
      <Text>Task screen</Text>
    </Layout>
  );
};

TaskScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon
      name={`bar-chart${focused ? '' : '-outline'}`}
      height={25}
      fill='green'
    />
  ),
};

export default TaskScreen;
