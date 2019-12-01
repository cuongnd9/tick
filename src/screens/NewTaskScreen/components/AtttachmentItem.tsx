import React from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  uri: string;
}

const AttachmentItem: React.FC<Props> = ({ uri }) => {
  return (
    <View>
      <View style={styles.container}>
      <Image source={{ uri: uri }} style={styles.image} />
    </View>
    <TouchableWithoutFeedback onPress={() => console.log('press...')}>
        <View style={styles.icon}>
          <Icon name='close-outline' width={15} height={15} fill='#fff' />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 10,
    padding: 0,
    width: 100,
    height: 100,
    margin: 10
  },
  image: {
    borderRadius: 10,
    width: 100,
    height: 100
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: color.primary,
    borderRadius: 15,
    padding: 5
  }
});

export default AttachmentItem;
