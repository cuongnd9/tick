import React, { useEffect, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import _ from 'lodash';
import moment from 'moment';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/models';
import { getListAction as getCategoryListAction } from 'src/models/category';
import { getTaskListAction, Task } from 'src/models/task';
import { SearchHeader, StatusBar } from 'src/components';
import { CategoryList, TaskList } from './components';
import { color } from 'src/config/theme';
import { taskListType } from 'src/config/constants';

interface Props {
  navigation: NavigationStackProp;
}

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isGranted, setIsGranted] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const { list } = useSelector((state: AppState) => state.task);
  const data = (list && _.flatten(list.map(item => item.data))) || [];

  useEffect(() => {
    setTaskList(data);
  }, [data]);
  useAsyncEffect(async () => {
    const isAllow = await askPermissions();
    setIsGranted(isAllow);
  }, []);
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getTaskListAction({}));
  }, []);

  const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return false;
    }
    return true;
  };

  const scheduleNotification = (task: Task) => {
    if (moment(task.dueDate).isSameOrAfter(moment())) {
      Notifications.scheduleLocalNotificationAsync(
        {
          title: task.title,
          body: task.title
        },
        {
          time: new Date(task.dueDate).getTime() + 5000
        }
      );
    }
  };

  useAsyncEffect(async () => {
    if (isGranted) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      taskList.forEach(task => {
        scheduleNotification(task);
      });
    }
  }, [taskList.length]);

  const pressSearchButton = () => {
    navigation.navigate('SearchTask');
  };

  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader
        navigation={navigation}
        isfakeSearchInput
        onSearchPress={pressSearchButton}
      />
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
