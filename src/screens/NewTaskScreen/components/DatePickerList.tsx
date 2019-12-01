import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Icon } from 'react-native-ui-kitten';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { color } from 'src/config/theme';

const DatePickerList: React.FC = () => {
  const [showDueDate, setShowDueDate] = useState(false);
  const [showReminderDate, setShowReminderDate] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setShowDueDate(!showDueDate)}>
        <View style={{ ...styles.dateContainer, marginRight: 5 }}>
          <Text category='label'>Set due date</Text>
          <View style={styles.dateContent}>
            <Icon
              style={styles.icon}
              name='clock-outline'
              width={24}
              height={24}
              fill={color.secondary}
            />
            <Text>2019-12-01T07:49:14</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => setShowReminderDate(!showReminderDate)}
      >
        <View style={{ ...styles.dateContainer, marginLeft: 5 }}>
          <Text category='label'>Set reminder date</Text>
          <View style={styles.dateContent}>
            <Icon
              style={styles.icon}
              name='bell-outline'
              width={24}
              height={24}
              fill={color.secondary}
            />
            <Text>2019-12-01T07:49:14</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <DateTimePicker
        mode='datetime'
        onConfirm={(date: any) => {
          console.log(date, 'due date');
          setShowDueDate(!showDueDate);
        }}
        onCancel={() => setShowDueDate(!showDueDate)}
        isVisible={showDueDate}
      />
      <DateTimePicker
        mode='datetime'
        onConfirm={(date: any) => {
          console.log(date, 'reminder date');
          setShowReminderDate(!showReminderDate);
        }}
        onCancel={() => setShowReminderDate(!showReminderDate)}
        isVisible={showReminderDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dateContainer: {
    display: 'flex',
  },
  dateContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: color.secondary,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 12,
    backgroundColor: '#fff'
  },
  icon: {
    marginRight: 5
  }
});

export default DatePickerList;
