import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  iconName: string;
  style?: any;
}

const IconButton: React.FC<Props> = ({ iconName, style }) => {
  return (
    <TouchableWithoutFeedback>
        <View style={{ ...styles.container, ...style }}>
          <Icon
            name={iconName}
            width={24}
            height={24}
            fill={color.primary}
          />
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
    borderRadius: 10
  }
});

export default IconButton;
