import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  onAddStep?: Function;
}

const AddStepItem: React.FC<Props> = ({ onAddStep }) => {
  const handleEnterPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {};

  const [editable, setEditable] = useState(false);
  return (
    <View>
      {editable ? (
        <View>
          <View
            style={{ ...styles.container, borderColor: 'rgba(7,104,159,0.2)' }}
          >
            <Icon
              name='edit-outline'
              width={24}
              height={24}
              fill={color.secondary}
            />
            <TextInput
              style={styles.input}
              placeholder='Step'
              underlineColorAndroid='transparent'
              autoFocus
              onKeyPress={handleEnterPress}
            />
          </View>
          <TouchableWithoutFeedback
            style={styles.closeIcon}
            onPress={() => setEditable(!editable)}
          >
            <View style={styles.closeIcon}>
              <Icon name='close-outline' width={15} height={15} fill='#fff' />
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            setEditable(!editable);
          }}
        >
          <View style={styles.container}>
            <Icon
              name='plus-outline'
              width={24}
              height={24}
              fill={color.primary}
            />
            <Text style={styles.content}>Add step</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

AddStepItem.defaultProps = {
  onAddStep: () => {}
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 126, 103, 0.2)',
    backgroundColor: '#fff'
  },
  content: {
    marginHorizontal: 15,
    color: color.primary
  },
  input: {
    backgroundColor: '#fff',
    color: '#424242',
    overflow: 'hidden',
    alignSelf: 'stretch',
    flex: 1,
    marginLeft: 12
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: color.primary,
    borderRadius: 15,
    padding: 5
  }
});

export default AddStepItem;
