import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getListAction } from 'src/models/category';
import { SearchHeader, StatusBar } from 'src/components';
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
      <Text>Task screen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: color.background
  }
});

export default TaskScreen;
