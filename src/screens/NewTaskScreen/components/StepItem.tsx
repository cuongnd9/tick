import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {}

const StepItem: React.FC<Props> = () => {
  const [editable, setEditable] = useState(false);
  return (
    <View style={styles.container}>
      <Icon name='plus-outline' width={24} height={24} fill={color.secondary} />
      <TouchableWithoutFeedback>
        {editable ? (
          <TextInput
            style={styles.input}
            placeholder='Step'
            underlineColorAndroid='transparent'
            autoFocus
          />
        ) : (
          <Text style={styles.content}>Step 1</Text>
        )}
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.closeIcon}>
          <Icon name='close-outline' width={15} height={15} fill='#fff' />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

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
    top: -10,
    right: -10,
    backgroundColor: color.primary,
    borderRadius: 15,
    padding: 5
  },
  content: {
    marginHorizontal: 12,
    color: color.secondary
  },
  input: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#424242',
    overflow: 'hidden',
    alignSelf: 'stretch',
    flex: 1
  }
});

export default StepItem;
