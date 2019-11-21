import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  iconName?: string;
  style?: any;
  width?: number;
  height?: number;
  onPress?: Function;
}

const FakeSearchInput: React.FC<Props> = ({
  iconName,
  style,
  width,
  height,
  onPress
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={{ ...styles.container, ...style }}>
      <Icon
        name={iconName}
        width={width}
        height={height}
        fill={color.primary}
      />
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 11
  },
});

FakeSearchInput.defaultProps = {
  width: 24,
  height: 24,
  iconName: 'search'
};

export default FakeSearchInput;
