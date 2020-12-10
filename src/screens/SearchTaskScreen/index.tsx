import React, { useEffect } from 'react';
import { diana } from 'diana-js';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { SearchHeader, StatusBar } from 'src/components';
import TaskList from './components/TaskList';
import { searchAction } from 'src/models/task';
import { color } from 'src/config/theme';
import { taskListType } from 'src/config/constants';

interface Props {
  navigation: NavigationStackProp;
}

const SearchTaskScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchAction(diana()));
  }, []);
  const handleSearch = (keyword: string) => {
    dispatch(searchAction(keyword));
  };
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader
        navigation={navigation}
        showSearchBtn
        autoFocus
        onSearchPress={handleSearch}
        onClear={() => handleSearch(diana())}
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
    backgroundColor: color.background
  },
  main: {
    padding: 15
  }
});

export default SearchTaskScreen;
