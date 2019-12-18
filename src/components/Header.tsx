import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import IconButton from './IconButon';
import { color } from 'src/config/theme';

interface Props {
  leftIconName?: string;
  rightIconName?: string;
  title?: string;
  leftPress?: Function;
}

const Header: React.FC<Props> = ({
  leftIconName,
  rightIconName,
  title,
  leftPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        {leftIconName && (
          <IconButton
            onPress={leftPress}
            showShadow={false}
            iconName={leftIconName}
          />
        )}
      </View>
      <View style={{ ...styles.childContainer, alignItems: 'center' }}>
        <Text style={styles.title} category='s1'>
          {title}
        </Text>
      </View>
      <View style={styles.childContainer}>
        {rightIconName && (
          <IconButton showShadow={false} iconName={rightIconName} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 44 : 56,
    paddingRight: 8,
    paddingLeft: 8
  },
  childContainer: {
    flex: 1
  },
  title: {
    color: color.primary
  }
});

Header.defaultProps = {};

export default Header;
