import React, { useState } from 'react';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Modal,
  Dimensions
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

const AttachmentButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const handlePress = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <Icon
            name='attach-outline'
            width={24}
            height={24}
            fill={color.primary}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal transparent animationType='fade' visible={visible}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableHighlight onPress={() => setVisible(!visible)}>
              <View
                style={{
                  ...styles.button,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff'
                }}
              >
                <Text style={{ textAlign: 'center' }} category='s2'>
                  Choose from Camera
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setVisible(!visible)}>
              <View
                style={{
                  ...styles.button,
                  borderBottomWidth: 5,
                  borderBottomColor: '#fff'
                }}
              >
                <Text style={{ textAlign: 'center' }} category='s2'>
                  Choose for Library
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setVisible(!visible)}>
              <View
                style={{
                  ...styles.button,
                  ...styles.cancelButton,
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10
                }}
              >
                <Text style={{ textAlign: 'center' }} category='s2'>
                  Cancel
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: color.primary
  },
  modal: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.background,
    opacity: 0.5,
    padding: 16
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  button: {
    padding: 12,
    width: Dimensions.get('window').width - 32,
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: '#FF3D71'
  }
});

export default AttachmentButton;
