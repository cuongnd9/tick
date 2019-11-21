import React from 'react';
import { View, TextInput as TextInputCore, StyleSheet } from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  iconName: string;
  placeholder?: string;
  style?: any;
  width?: number;
  height?: number;
  onPress?: Function;
}

const TextInput: React.FC<Props> = ({
  iconName,
  placeholder,
  style,
  width,
  height,
  onPress
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Icon
        style={styles.icon}
        name={iconName}
        width={width}
        height={height}
        fill={color.primary}
      />
      <TextInputCore
        style={styles.input}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
        onFocus={() => onPress()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  icon: {
    marginLeft: 10
  },
  input: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#424242',
    overflow: 'hidden',
    alignSelf: 'stretch',
    flex: 1
  }
});

TextInput.defaultProps = {
  width: 24,
  height: 24
};

export default TextInput;
