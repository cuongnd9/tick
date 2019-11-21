import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import TextInput from './TextInput';
import IconButton from './IconButon';
import { color } from 'src/config/theme';

interface Props {
  showNoti?: boolean;
  onSearchPress?: Function;
}

const SearchHeader: React.FC<Props> = ({ showNoti, onSearchPress }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.search} onPress={onSearchPress} iconName='search-outline' />
      {showNoti && (
        <IconButton style={styles.filter} iconName='bell-outline' />
      )}
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

SearchHeader.defaultProps = {
  showNoti: true
};

export default SearchHeader;
