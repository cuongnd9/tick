import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

const DatePickerList: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
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
      <TouchableWithoutFeedback>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateContainer: {
    display: 'flex',
    width: '50%'
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
