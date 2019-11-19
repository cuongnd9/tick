import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { hideNotificationAction } from 'src/models/global/notification';

type Status = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export interface Props {
  visible?: boolean;
  content?: string;
  status?: Status;
}

const GlobalNotification: React.FC<Props> = ({ visible, status, content }) => {
  const dispatch = useDispatch();
  const convertColorFromStatus = () => {
    switch (status) {
      case 'success':
        return '#00E096';
      case 'info':
        return '#0095FF';
      case 'warning':
        return '#FFAA00';
      case 'danger':
        return '#FF3D71';
      default:
        return '#3366FF';
    }
  };
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
      <Animatable.View
        animation='bounceInUp'
        style={{
          ...styles.container,
          backgroundColor: convertColorFromStatus()
        }}
      >
        <Text style={styles.content}>{content}</Text>
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
    padding: 10
  },
  content: {
    color: 'white'
  }
});

export default GlobalNotification;
