import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Input, Icon } from 'react-native-ui-kitten';
import { Header, StatusBar } from 'src/components';
import { CategoryList, AttachmentList, DatePickerList } from './components';
import { color } from 'src/config/theme';

const NewTaskScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header title='New task' />
      <View style={styles.content}>
        <Text category='label'>Enter title</Text>
        <Input
          placeholder='Title'
          style={styles.input}
          icon={() => <Icon name='bulb-outline' fill={color.primary} />}
        />
        <Text category='label'>Choose category</Text>
        <CategoryList />
        <Text category='label'>Add attachments</Text>
        <AttachmentList />
        <DatePickerList />
        <Text category='label'>Enter description</Text>
        <Input
          placeholder='Description'
          size='large'
          style={styles.input}
          icon={() => <Icon name='edit-outline' fill={color.primary} />}
        />
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
    padding: 15
  },
  input: {
    borderColor: color.secondary,
    borderRadius: 10
  }
});

export default NewTaskScreen;
