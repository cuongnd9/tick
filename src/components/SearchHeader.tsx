import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import TextInput from './TextInput';
import IconButton from './IconButon';
import { color } from 'src/config/theme';

const SearchHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.search} iconName='search-outline' />
      <IconButton style={styles.filter} iconName='funnel-outline' />
      <IconButton iconName='person-outline' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 44 : 56,
    paddingRight: 8,
    paddingLeft: 8
  },
  search: {
    flex: 1,
    marginRight: 16
  },
  filter: {
    marginRight: 5
  }
});

export default SearchHeader;
