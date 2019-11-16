import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Text, Spinner } from 'react-native-ui-kitten';
import { color } from '../config/theme';

type Size = 'giant' | 'large' | 'medium' | 'small' | 'tiny';
type Status =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'alternative';

export interface Props {
  visible?: boolean;
  size?: Size;
  status?: Status;
  content?: string;
}

const GlobalLoading: React.FC<Props> = ({ visible, size, content }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <Spinner size={size} />
        <Text style={styles.content}>{content}</Text>
      </View>
    </Modal>
  );
};

GlobalLoading.defaultProps = {
  visible: false,
  size: 'medium',
  status: 'primary'
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    opacity: 0.5,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    marginTop: 10
  }
});

export default GlobalLoading;
