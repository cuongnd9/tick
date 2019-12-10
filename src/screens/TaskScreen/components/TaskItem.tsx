import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import moment from 'moment';
import { color } from 'src/config/theme';
import { taskStatus } from 'src/config/constants';
import { Task } from 'src/models/task';
import { taskListType } from 'src/config/constants';
import { categoryIcons, defaultCategoryIcon } from 'src/config/icons';

interface Props {
  task: Task;
  listType: string;
  onSelect?: Function;
}

const TaskItem: React.FC<Props> = ({ listType, task, onSelect }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.contentContainer, marginBottom: 10 }}>
        <View style={styles.titleContainer}>
          <TouchableWithoutFeedback>
            <Icon
              name={
                taskStatus.done
                  ? 'checkmark-square-2-outline'
                  : 'square-outline'
              }
              width={32}
              height={32}
              fill={color.primary}
            />
          </TouchableWithoutFeedback>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            category='h4'
            style={styles.title}
          >
            {task.title}
          </Text>
        </View>
        <View>
          <Icon
            name='star-outline'
            width={24}
            height={24}
            fill={color.primary}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.reminderContainer}>
          <Text category='s2'>100%</Text>
          <Icon
            name='arrow-right'
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Icon
            name='clock-outline'
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Text style={{ marginLeft: 2 }} category='s2'>
            {listType === taskListType.today
              ? moment(task.reminderDate).format('hh:mm A')
              : moment(task.reminderDate).format('MMM Do hh:mm A')}
          </Text>
          <Icon
            name='arrow-right'
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Icon
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
              categoryIcons.find(item =>
                item.nameList.includes(task.category.name.toLowerCase())
              ).icon || defaultCategoryIcon
            }
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Text>{task.category.name}</Text>
        </View>
      </View>
    </View>
  );
};

TaskItem.defaultProps = {
  onSelect: () => {}
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
    flexDirection: 'row'
  },
  title: {
    marginLeft: 5,
    width: '80%'
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
