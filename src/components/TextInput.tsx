import React, { useRef } from 'react';
import {
  View,
  TextInput as TextInputCore,
  TouchableWithoutFeedback,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  iconName: string;
  placeholder?: string;
  style?: any;
  width?: number;
  height?: number;
  onEnter?: Function;
}

const TextInput: React.FC<Props> = ({
  iconName,
  placeholder,
  style,
  width,
  height,
  onEnter
}) => {
  const refInput = useRef(null);
  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    onEnter(e.nativeEvent.text);
  };
  return (
    <View style={{ ...styles.container, ...style }}>
      <Icon
        style={styles.iconLeft}
        name={iconName}
        width={width}
        height={height}
        fill={color.primary}
      />
      <TextInputCore
        style={styles.input}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
        autoFocus
        onSubmitEditing={handleSubmit}
        ref={refInput}
      />
      <TouchableWithoutFeedback onPress={() => refInput.current.clear()}>
        <View style={styles.iconRight}>
          <Icon
            name='close-outline'
            width={width}
            height={height}
            fill={color.text}
          />
        </View>
      </TouchableWithoutFeedback>
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
  iconLeft: {
    marginLeft: 10
  },
  iconRight: {
    marginRight: 10
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
