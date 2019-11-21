import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  title: string;
  style?: any;
  showShadow?: boolean;
}

const Button: React.FC<Props> = ({ title, style, showShadow }) => {
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
    <TouchableWithoutFeedback>
      <View style={mainStyle}>
        <Text style={styles.text} category='s1'>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    paddingLeft: 22,
    paddingRight: 22,
    borderRadius: 10
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  text: {
    color: color.text
  }
});

Button.defaultProps = {
  showShadow: true
};

export default Button;
