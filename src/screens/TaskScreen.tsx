import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { SearchHeader, StatusBar, TextInput } from 'src/components';
import { color } from 'src/config/theme';

const TaskScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader />
      <Text>Task screen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  }
});

export default TaskScreen;
