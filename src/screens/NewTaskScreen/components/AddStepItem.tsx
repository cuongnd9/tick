import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {}

const AddStepItem: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Icon name='plus-outline' width={24} height={24} fill={color.primary} />
      <Text style={styles.content}>Add step</Text>
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
    borderColor: 'rgba(255, 126, 103, 0.2)',
    backgroundColor: '#fff'
  },
  content: {
    marginHorizontal: 12,
    color: color.primary
  }
});

export default AddStepItem;
