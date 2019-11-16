import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { hideNotificationAction } from '../models/global/notification';

type Status =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'alternative';

export interface Props {
  visible?: boolean;
  content?: string;
  status?: Status;
}

const GlobalNotification: React.FC<Props> = ({ visible, status, content }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        dispatch(hideNotificationAction());
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [visible]);
  return (
    <Modal visible={visible} transparent>
      <Animatable.View animation='bounceInUp' style={styles.container}>
        <Text style={styles.content} >{content}</Text>
      </Animatable.View>
    </Modal>
  );
};

GlobalNotification.defaultProps = {
  visible: false,
  status: 'primary',
  content: ''
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 10,
  },
  content: {

  }
});

export default GlobalNotification;
