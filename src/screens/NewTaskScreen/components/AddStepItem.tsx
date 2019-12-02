import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  onAddStep?: Function;
}

const AddStepItem: React.FC<Props> = ({ onAddStep }) => {
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(null);
  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    onAddStep(e.nativeEvent.text);
    inputRef.current.clear();
    setEditable(!editable);
  };

  return (
    <View>
      {editable ? (
        <View>
          <View
            style={{
              ...styles.container,
              borderColor: 'rgba(255, 126, 103, 0.2)',
              backgroundColor: '#fff'
            }}
          >
            <Icon
              name='edit-outline'
              width={24}
              height={24}
              fill={color.primary}
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder='Step'
              underlineColorAndroid='transparent'
              autoFocus
              onSubmitEditing={handleSubmit}
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
            <Icon name='plus-outline' width={24} height={24} fill='#fff' />
            <Text style={{ ...styles.content, color: '#fff' }}>Add step</Text>
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
    borderColor: color.primary,
    backgroundColor: color.primary
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
    margin: 0,
    padding: 0,
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
