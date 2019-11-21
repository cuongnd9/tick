import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import TextInput from './TextInput';
import { color } from 'src/config/theme';

const renderSearchInput = (props?: any) => (
  <TopNavigationAction
    {...props}
    icon={() => <TextInput iconName='search-outline' />}
  />
);

const renderProfile = (props?: any) => (
  <TopNavigationAction
    {...props}
    icon={() => (
      <Icon name='person-outline' width={32} height={32} fill={color.primary} />
    )}
  />
);

const SearchHeader: React.FC = () => {
  return (
    <TopNavigation
      leftControl={renderSearchInput()}
      rightControls={renderProfile()}
    />
  );
};

export default SearchHeader;
