import _ from 'lodash';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { Step } from 'src/models/task';
import { stepStatus } from 'src/config/constants';
import { color } from 'src/config/theme';
import { getTaskListAction } from 'src/models/task';
import { updateStepStatus } from 'src/services/step.service';

interface Props {
  step: Step;
  onPress: Function;
}

const StepItem: React.FC<Props> = ({ step, onPress }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(step.status);
  const updateStatus = _.debounce(async () => {
    if (status !== step.status) {
      await updateStepStatus({ id: step.id, status });
      dispatch(getTaskListAction({ isLoading: false }));
    }
  }, 3000);
  const handleChangeStatus = () => {
    onPress({
      ...step,
      status: status !== stepStatus.done ? stepStatus.done : stepStatus.todo
    });
    setStatus(status !== stepStatus.done ? stepStatus.done : stepStatus.todo);
    updateStatus();
  };

  return (
    <TouchableWithoutFeedback onPress={handleChangeStatus}>
      <View style={styles.container}>
        <Icon
          name={
            status === stepStatus.done
              ? 'checkmark-circle-2-outline'
              : 'radio-button-off-outline'
          }
          width={24}
          height={24}
          fill={color.text}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          category='p1'
          style={{
            ...styles.title,
            textDecorationLine:
              status === stepStatus.done ? 'line-through' : 'none'
          }}
        >
          {step.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  title: {
    marginLeft: 5,
    maxWidth: '80%'
  }
});

export default StepItem;
