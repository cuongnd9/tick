import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { getListAction as getCategoryListAction } from 'src/models/category';
import { getTaskListAction } from 'src/models/task';
import { SearchHeader, StatusBar } from 'src/components';
import { CategoryList, TaskList } from './components';
import { color } from 'src/config/theme';
import { taskListType } from 'src/config/constants';

interface Props {
  navigation?: NavigationStackProp;
}

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getTaskListAction({}));
  }, []);

  const pressSearchButton = () => {
    navigation.navigate('SearchTask');
  };

  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader isfakeSearchInput onSearchPress={pressSearchButton} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <CategoryList />
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

export default TaskScreen;
