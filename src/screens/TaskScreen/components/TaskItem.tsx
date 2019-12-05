import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';
import { taskStatus } from 'src/config/constants';

interface Props {
  task: any;
  isActive?: boolean;
  isLastItem?: boolean;
  onSelect?: Function;
}

const TaskItem: React.FC<Props> = ({
  task,
  isActive,
  isLastItem,
  onSelect
}) => {
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
          <Text category='h4' style={styles.title}>
            Learn Rust
          </Text>
        </View>
        <Icon
          name='star-outline'
          width={19}
          height={19}
          fill={color.secondary}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.reminderContainer}>
          <Text category='s2'>100%</Text>
          <Icon
            name='minus-outline'
            width={19}
            height={19}
            fill={color.secondary}
            style={{ transform: [{ rotate: '90deg' }] }}
          />
          <Icon
            name='clock-outline'
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Text category='s2'>14:00</Text>
          <Icon
            name='minus-outline'
            width={19}
            height={19}
            fill={color.secondary}
            style={{ transform: [{ rotate: '90deg' }] }}
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
            name='navigation-2-outline'
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Text>Travel</Text>
        </View>
      </View>
    </View>
  );
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
    marginLeft: 5
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

TaskItem.defaultProps = {
  isActive: false,
  isLastItem: false,
  onSelect: () => {}
};

export default TaskItem;
