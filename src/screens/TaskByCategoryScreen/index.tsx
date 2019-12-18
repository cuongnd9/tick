import React from 'react';
import _ from 'lodash';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { StatusBar, Header } from 'src/components';
import { TaskList } from './components';
import { color } from 'src/config/theme';
import { taskListType } from 'src/config/constants';

interface Props {
  navigation: NavigationStackProp;
}

const TaskByCategoryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header
        title='Tasks'
        leftIconName='arrow-back-outline'
        leftPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <TaskList navigation={navigation} listType={taskListType.olderDays} />
          <TaskList navigation={navigation} listType={taskListType.today} />
          <TaskList navigation={navigation} listType={taskListType.tomorrow} />
          <TaskList navigation={navigation} listType={taskListType.nextDays} />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: color.background,
    padding: 5
  },
  main: {
    padding: 10,
    paddingTop: 20
  }
});

export default TaskByCategoryScreen;
