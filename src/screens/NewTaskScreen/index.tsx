import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
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
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [steps, setSteps] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(new Date());
  const [attachments, setAttachments] = useState([]);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log(
      title,
      category,
      steps,
      dueDate,
      reminderDate,
      attachments,
      description
    );
  };

  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header title='New task' />
      <KeyboardAvoidingView behavior='padding' enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={styles.content}>
            <Text style={{ ...styles.label, marginTop: 10 }} category='label'>
              Enter title
            </Text>
            <Input
              placeholder='Title'
              style={styles.input}
              value={title}
              onChangeText={text => setTitle(text)}
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
            <DatePickerList
              onGetDateList={(dueDate, reminderDate) => {
                setDueDate(dueDate);
                setReminderDate(reminderDate);
              }}
            />
            <Text style={{ ...styles.label, marginBottom: 5 }} category='label'>
              Add attachments
            </Text>
            <AttachmentList
              onGetAttachments={images => setAttachments(images)}
            />
            <Text style={{ ...styles.label, marginTop: 10 }} category='label'>
              Enter description
            </Text>
            <Input
              placeholder='Description'
              size='large'
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
              icon={() => <Icon name='edit-outline' fill={color.secondary} />}
            />
            <Button onPress={handleSubmit} style={styles.submit}>
              ADD TASK
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
