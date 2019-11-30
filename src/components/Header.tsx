import React from 'react';
import { StyleSheet, View, Platform, ViewStyle } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import IconButton from './IconButon';
import { color } from 'src/config/theme';

interface Props {
  leftIconName?: string;
  rightIconName?: string;
  title?: string;
}

const Header: React.FC<Props> = ({ leftIconName, rightIconName, title }) => {
  const mainStyle =
    !leftIconName && !rightIconName
      ? {
          ...styles.container,
          justifyContent: 'center'
        }
      : {
          ...styles.container,
          justifyContent: 'space-between'
        };
  return (
    <View style={mainStyle as ViewStyle}>
      {leftIconName && (
        <IconButton showShadow={false} iconName={leftIconName} />
      )}
      <Text style={styles.title} category='s1'>
        {title}
      </Text>
      {rightIconName && (
        <IconButton showShadow={false} iconName={rightIconName} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 44 : 56,
    paddingRight: 8,
    paddingLeft: 8
  },
  title: {
    color: color.primary
  }
});

Header.defaultProps = {};

export default Header;
