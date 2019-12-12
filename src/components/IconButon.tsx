import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  iconName: string;
  style?: any;
  showShadow?: boolean;
  onPress?: any;
}

const IconButton: React.FC<Props> = ({
  iconName,
  style,
  showShadow,
  onPress
}) => {
  const mainStyle = showShadow
    ? {
        ...styles.container,
        ...style,
        ...styles.shadow
      }
    : {
        ...styles.container,
        ...style
      };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={mainStyle}>
        <Icon name={iconName} width={24} height={24} fill={color.primary} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

IconButton.defaultProps = {
  showShadow: true,
  onPress: () => {}
};

export default IconButton;
