import React from 'react';
import { Icon } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';

interface Props {
  focused?: boolean;
  name: string;
  height: number;
  width: number;
}

const TabBarIcon: React.FC<Props> = ({ focused, name, height, width }) => {
  return (
    <Icon
      name={`${name}${focused ? '' : '-outline'}`}
      width={width}
      height={height}
      fill={color.primary}
    />
  );
};

TabBarIcon.defaultProps = {
  focused: false
};

export default TabBarIcon;
