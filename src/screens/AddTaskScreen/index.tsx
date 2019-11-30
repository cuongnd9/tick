import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Input, Icon } from 'react-native-ui-kitten';
import { Header, StatusBar } from 'src/components';
import { CategoryList } from './components'
import { color } from 'src/config/theme';

const AddTaskScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header title='New task' />
      <View style={styles.content}>
        <Input
          placeholder='Title'
          style={styles.title}
          icon={() => <Icon name='bulb-outline' fill={color.primary} />}
        />
        <Text category='label'>Choose category</Text>
        <CategoryList />
        <Text category='label'>Add attachments</Text>
        <Text category='label'>Add due date</Text>
        <Text category='label'>Reminder me</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: color.background
  },
  content: {
    flex: 1,
    padding: 16
  },
  title: {
    borderColor: color.secondary,
    borderRadius: 10
  }
});

export default AddTaskScreen;
