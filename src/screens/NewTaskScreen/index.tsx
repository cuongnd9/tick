import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Text, Input, Icon, Button } from 'react-native-ui-kitten';
import { Header, StatusBar } from 'src/components';
import {
  CategoryList,
  AttachmentList,
  DatePickerList,
  StepList
} from './components';
import { color } from 'src/config/theme';

const NewTaskScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <Header title='New task' />
        <View style={styles.content}>
          <Text style={{ ...styles.label, marginTop: 10 }} category='label'>
            Enter title
          </Text>
          <Input
            placeholder='Title'
            style={styles.input}
            icon={() => <Icon name='bulb-outline' fill={color.secondary} />}
          />
          <Text style={styles.label} category='label'>
            Choose category
          </Text>
          <CategoryList />
          <Text style={{ ...styles.label, marginBottom: 5 }} category='label'>
            Enter steps
          </Text>
          <StepList />
          <DatePickerList />
          <Text style={{ ...styles.label, marginBottom: 5 }} category='label'>
            Add attachments
          </Text>
          <AttachmentList />
          <Text style={{ ...styles.label, marginTop: 10 }} category='label'>
            Enter description
          </Text>
          <Input
            placeholder='Description'
            size='large'
            style={styles.input}
            icon={() => <Icon name='edit-outline' fill={color.secondary} />}
          />
          <Button style={styles.submit}>ADD TASK</Button>
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
  label: {
    marginBottom: 10,
    marginTop: 20
  },
  content: {
    flex: 1,
    padding: 15
  },
  input: {
    borderColor: 'rgba(7,104,159,0.2)',
    borderRadius: 10
  },
  submit: {
    backgroundColor: color.secondary,
    borderColor: color.secondary,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10
  }
});

export default NewTaskScreen;
