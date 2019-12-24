import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { NavigationStackProp } from 'react-navigation-stack';
import StepList from './StepList';
import { color } from 'src/config/theme';
import { taskStatus, stepStatus } from 'src/config/constants';
import {
  Task,
  updateTaskAction,
  getTaskListAction,
  deleteTaskAction,
  Step
} from 'src/models/task';
import { taskListType } from 'src/config/constants';
import { categoryIcons, defaultCategoryIcon } from 'src/config/icons';

interface Props {
  navigation: NavigationStackProp;
  task: Task;
  listType: string;
  onSelect?: Function;
  onRemove?: Function;
}

const TaskItem: React.FC<Props> = ({
  navigation,
  listType,
  task,
  onSelect,
  onRemove
}) => {
  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(task);
  const [status, setStatus] = useState(task.status);
  const updateStatus = _.debounce(() => {
    status === currentTask.status &&
      dispatch(
        updateTaskAction({
          id: currentTask.id,
          body: {
            status:
              status !== taskStatus.done ? taskStatus.done : taskStatus.todo
          },
          isLoading: false,
          callback: () => dispatch(getTaskListAction({ isLoading: false }))
        })
      ),
      3000;
  });
  const handleChangeStatus = () => {
    setStatus(status !== taskStatus.done ? taskStatus.done : taskStatus.todo);
    updateStatus();
  };
  const handleDeleteTask = () => {
    dispatch(
      deleteTaskAction({
        id: currentTask.id
      })
    );
    onRemove(currentTask.id);
  };
  const renderDeleteButton = () => (
    <TouchableWithoutFeedback onPress={handleDeleteTask}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FF3D71',
          padding: 30,
          marginBottom: 10,
          marginLeft: 10,
          borderRadius: 10
        }}
      >
        <Icon name='trash' width={24} height={24} fill='#fff' />
      </View>
    </TouchableWithoutFeedback>
  );
  const handleProcess = () => {
    const cloneTask = _.cloneDeep(currentTask);
    const completedSteps = cloneTask.steps.filter(
      step => step.status === stepStatus.done
    );
    return `${(completedSteps.length * 100) / currentTask.steps.length}%`;
  };
  return (
    <Swipeable renderRightActions={renderDeleteButton}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('EditTask', { task });
          onSelect(task.id);
        }}
      >
        <View style={styles.container}>
          <View style={{ ...styles.contentContainer, marginBottom: 10 }}>
            <TouchableWithoutFeedback onPress={handleChangeStatus}>
              <View style={styles.titleContainer}>
                <Icon
                  name={
                    status === taskStatus.done
                      ? 'checkmark-square-2-outline'
                      : 'square-outline'
                  }
                  width={32}
                  height={32}
                  fill={color.primary}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  category='h4'
                  style={{
                    ...styles.title,
                    textDecorationLine:
                      status === taskStatus.done ? 'line-through' : 'none'
                  }}
                >
                  {currentTask.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View>
              <Icon
                name='star-outline'
                width={24}
                height={24}
                fill={color.primary}
              />
            </View>
          </View>
          <View style={{ ...styles.contentContainer, paddingLeft: 3 }}>
            <View style={styles.reminderContainer}>
              {currentTask.steps.length > 0 && (
                <>
                  <Text category='s2'>{handleProcess()}</Text>
                  <Icon
                    name='arrow-right'
                    width={19}
                    height={19}
                    fill={color.secondary}
                  />
                </>
              )}
              <Icon
                name='clock-outline'
                width={19}
                height={19}
                fill={color.secondary}
              />
              <Text style={{ marginLeft: 2 }} category='s2'>
                {listType === taskListType.today
                  ? moment(currentTask.reminderDate).format('hh:mm A')
                  : moment(currentTask.reminderDate).format('MMM Do hh:mm A')}
              </Text>
              <Icon
                name='arrow-right'
                width={19}
                height={19}
                fill={color.secondary}
              />
              <Icon
                vis={false}
                name='attach-outline'
                width={19}
                height={19}
                fill={color.secondary}
              />
              <Icon
                name='bell-outline'
                width={19}
                height={19}
                fill={color.secondary}
              />
            </View>
            <View style={styles.categoryContainer}>
              <Icon
                name={
                  _.get(
                    categoryIcons.find(item =>
                      item.nameList.includes(
                        currentTask.category.name.toLowerCase()
                      )
                    ),
                    'icon'
                  ) || defaultCategoryIcon
                }
                width={19}
                height={19}
                fill={color.secondary}
              />
              <Text>{currentTask.category.name}</Text>
            </View>
          </View>
          <StepList
            onPress={(steps: Step[]) =>
              setCurrentTask({
                ...currentTask,
                steps
              })
            }
            steps={currentTask.steps}
          />
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

TaskItem.defaultProps = {
  onSelect: () => {},
  onRemove: () => {}
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(7,104,159,0.2)'
  },
  contentContainer: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  active: {
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 126, 103, 0.2)'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginLeft: 5,
    maxWidth: '80%'
  },
  reminderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default TaskItem;
