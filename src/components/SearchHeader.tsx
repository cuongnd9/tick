import React from 'react';
import {
  Input,
  Icon,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

const renderSearchInput = (props?: any) => (
  <Input
    placeholder='Search'
    size='small'
    icon={() => (
      <TopNavigationAction
        {...props}
        icon={() => (
          <Icon
            name='search-outline'
            width={32}
            height={32}
            fill={color.primary}
          />
        )}
      />
    )}
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
