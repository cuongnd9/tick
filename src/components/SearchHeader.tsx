import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import TextInput from './TextInput';
import IconButton from './IconButon';
import { color } from 'src/config/theme';

interface Props {
  showFilter?: boolean;
}

const SearchHeader: React.FC<Props> = ({ showFilter }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.search} iconName='search-outline' />
      {showFilter && (
        <IconButton style={styles.filter} iconName='funnel-outline' />
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
  showFilter: true
};

export default SearchHeader;
