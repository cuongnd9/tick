import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Layout, Text, Input, Icon, Button } from 'react-native-ui-kitten';
import { useDispatch } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { updateTaskAction, getTaskListAction, Task } from 'src/models/task';
import { Header, StatusBar } from 'src/components';
import {
  CategoryList,
  AttachmentList,
  DatePickerList,
  StepList
} from './components';
import { color } from 'src/config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const EditTaskScreen: React.FC<Props> = ({ navigation }) => {
  const task: Task = navigation.getParam('task', {});

  const dispatch = useDispatch();

  const [reset, setReset] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState('');
  const [steps, setSteps] = useState<{ newSteps?: any[]; deleteSteps?: any[] }>(
    {}
  );
  const [dueDate, setDueDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(new Date());
  const [attachments, setAttachments] = useState<{
    newImages?: any[];
    deleteImages?: any[];
  }>({});
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [reset]);

  const handleSubmit = () => {
    const formData: FormData = new FormData();
    attachments.newImages.forEach(attachment => {
      const fileType = attachment.url.split('.').pop();
      const file = {
        uri: attachment.url,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      };
      formData.append('images', file);
    });
    dispatch(
      updateTaskAction({
        id: task.id,
        body: {
          images: {
            newImages: formData,
            deleteImages: attachments.deleteImages
          },
          title,
          category,
          steps: {
            newSteps: steps.newSteps,
            deleteSteps: steps.deleteSteps
          },
          dueDate,
          reminderDate,
          description
        },
        callback: () => {
          setReset(!reset);
          dispatch(getTaskListAction({}));
        }
      })
    );
  };

  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header title='Edit task' />
      <KeyboardAvoidingView behavior='padding' enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={styles.content}>
            <Text style={{ ...styles.label, marginTop: 0 }} category='label'>
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
            <CategoryList
              initialValue={task.category}
              reset={reset}
              onGetSelectedId={id => setCategory(id)}
            />
            <Text style={{ ...styles.label, marginBottom: 5 }} category='label'>
              Enter steps
            </Text>
            <StepList
              initialValue={task.steps}
              reset={reset}
              onGetStepList={list => setSteps(list)}
            />
            <DatePickerList
              initialValue={{
                dueDate: task.dueDate,
                reminderDate: task.reminderDate
              }}
              reset={reset}
              onGetDateList={(dueDate, reminderDate) => {
                setDueDate(dueDate);
                setReminderDate(reminderDate);
              }}
            />
            <Text style={{ ...styles.label, marginBottom: 5 }} category='label'>
              Add attachments
            </Text>
            <AttachmentList
              initialValue={task.images}
              reset={reset}
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
            <Button
              disabled={!title || !category}
              onPress={handleSubmit}
              style={styles.submit}
            >
              EDIT TASK
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

export default EditTaskScreen;
