import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  content: string;
  id: string;
  onRemove?: Function;
}

const StepItem: React.FC<Props> = ({ content, id, onRemove }) => {
  return (
    <View style={{ position: 'relative' }}>
      <View style={styles.container}>
        <Icon
          name='radio-button-off-outline'
          width={24}
          height={24}
          fill={color.secondary}
        />
        <TouchableWithoutFeedback>
          <Text style={styles.content}>{content}</Text>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={() => onRemove(id)}>
        <View style={styles.closeIcon}>
          <Icon name='close-outline' width={15} height={15} fill='#fff' />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

StepItem.defaultProps = {
  onRemove: () => {}
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(7,104,159,0.2)',
    backgroundColor: '#fff'
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: color.secondary,
    borderRadius: 15,
    padding: 5
  },
  content: {
    marginHorizontal: 12,
    color: color.secondary
  },
});

export default StepItem;
