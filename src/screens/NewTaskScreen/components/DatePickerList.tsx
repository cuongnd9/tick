import React, { useState } from 'react';
import moment from 'moment';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Icon } from 'react-native-ui-kitten';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { color } from 'src/config/theme';

interface Props {
  onGetDateList?: Function;
}

const DatePickerList: React.FC<Props> = ({ onGetDateList }) => {
  const [dueDate, setDueDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showDueDate, setShowDueDate] = useState(false);
  const [showReminderDate, setShowReminderDate] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setShowDueDate(!showDueDate)}>
        <View style={{ ...styles.dateContainer, marginRight: 5 }}>
          <Text style={styles.label} category='label'>
            Set due date
          </Text>
          <View style={styles.dateContent}>
            <Icon
              style={styles.icon}
              name='clock-outline'
              width={24}
              height={24}
              fill={color.secondary}
            />
            <Text>{moment(dueDate).format('MMMM Do YYYY, hh:mm:ss A')}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => setShowReminderDate(!showReminderDate)}
      >
        <View style={{ ...styles.dateContainer, marginLeft: 5 }}>
          <Text style={styles.label} category='label'>
            Set reminder date
          </Text>
          <View style={styles.dateContent}>
            <Icon
              style={styles.icon}
              name='bell-outline'
              width={24}
              height={24}
              fill={color.secondary}
            />
            <Text>
              {moment(reminderDate).format('MMMM Do YYYY, hh:mm:ss A')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <DateTimePicker
        date={dueDate}
        mode='datetime'
        onConfirm={(date: any) => {
          setShowDueDate(!showDueDate);
          setDueDate(date);
        }}
        onCancel={() => setShowDueDate(!showDueDate)}
        onHideAfterConfirm={() => onGetDateList(dueDate, reminderDate)}
        isVisible={showDueDate}
      />
      <DateTimePicker
        date={reminderDate}
        mode='datetime'
        onConfirm={(date: any) => {
          setShowReminderDate(!showReminderDate);
          setReminderDate(date);
        }}
        onCancel={() => setShowReminderDate(!showReminderDate)}
        onHideAfterConfirm={() => onGetDateList(dueDate, reminderDate)}
        isVisible={showReminderDate}
      />
    </View>
  );
};

DatePickerList.defaultProps = {
  onGetDateList: () => {}
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
    flex: 1
  },
  dateContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(7,104,159,0.2)',
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 12,
    backgroundColor: '#fff'
  },
  icon: {
    marginRight: 5
  },
  label: {
    marginBottom: 10,
    marginTop: 20
  }
});

export default DatePickerList;
