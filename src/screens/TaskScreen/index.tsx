import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getListAction } from 'src/models/category';
import { SearchHeader, StatusBar } from 'src/components';
import { CategoryList, TaskList } from './components';
import { color } from 'src/config/theme';

interface Props {
  navigation?: NavigationStackProp;
}

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAction());
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
          <Text category='label' style={styles.label}>
            Today, 21 Aug 2019
          </Text>
          <TaskList />
          <Text category='label' style={styles.label}>
            Tomorrow, 21 Aug 2019
          </Text>
          <TaskList />
          <Text category='label' style={styles.label}>
            Next days
          </Text>
          <TaskList />
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
  },
  label: {
    marginBottom: 10,
    marginTop: 20
  }
});

export default TaskScreen;
