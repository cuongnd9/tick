import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import TextInput from './TextInput';
import IconButton from './IconButon';
import Button from './Button';
import FakeSearchInput from './FakeSearchInput';
import { color } from 'src/config/theme';

interface Props {
  navigation?: NavigationStackProp;
  showNoti?: boolean;
  showSearchBtn?: boolean;
  isfakeSearchInput?: boolean;
  autoFocus?: boolean;
  onSearchPress?: Function;
  onClear?: Function;
}

const SearchHeader: React.FC<Props> = ({
  navigation,
  showNoti,
  showSearchBtn,
  isfakeSearchInput,
  autoFocus,
  onSearchPress,
  onClear
}) => {
  return (
    <View style={styles.container}>
      {!isfakeSearchInput ? (
        <TextInput
          style={styles.search}
          autoFocus={autoFocus}
          onEnter={onSearchPress}
          onClear={onClear}
          iconName='search-outline'
        />
      ) : (
        <FakeSearchInput style={styles.search} onPress={onSearchPress} />
      )}
      {showNoti && !showSearchBtn && (
        <IconButton style={styles.filter} iconName='bell-outline' />
      )}
      {!showSearchBtn && (
        <IconButton
          onPress={() => navigation.navigate('Profile')}
          iconName='person-outline'
        />
      )}
      {showSearchBtn && (
        <Button
          onPress={() => navigation.goBack()}
          showShadow={false}
          title='Close'
        />
      )}
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
    marginRight: 15
  },
  filter: {
    marginRight: 5
  }
});

SearchHeader.defaultProps = {
  showNoti: true,
  showSearchBtn: false,
  isfakeSearchInput: false,
  autoFocus: false
};

export default SearchHeader;
