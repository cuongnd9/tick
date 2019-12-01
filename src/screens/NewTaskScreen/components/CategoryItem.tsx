import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';
import { categoryIcons, defaultCategoryIcon } from 'src/config/icons';

interface Props {
  id: string;
  name: string;
  isActive?: boolean;
  isLastItem?: boolean;
  onSelect?: Function;
}

const CategoryItem: React.FC<Props> = ({
  id,
  name,
  isActive,
  isLastItem,
  onSelect
}) => {
  const [iconName, setIconName] = useState(defaultCategoryIcon);
  useEffect(() => {
    categoryIcons.forEach(categoryIcon => {
      if (categoryIcon.nameList.includes(name.toLowerCase())) {
        setIconName(categoryIcon.icon);
      }
    });
  }, [name]);
  useEffect(() => console.log(isActive));
  const containerStyle = isActive
    ? {
        ...styles.container,
        ...styles.active
      }
    : isLastItem
    ? {
        ...styles.container,
        marginRight: 0
      }
    : {
        ...styles.container
      };
  const nameStyle = isActive
    ? {
        ...styles.name,
        color: '#fff'
      }
    : {
        ...styles.name,
        color: color.secondary
      };
  return (
    <TouchableWithoutFeedback onPress={() => onSelect(id)}>
      <View style={containerStyle}>
        <Icon
          name={iconName}
          width={24}
          height={24}
          fill={isActive ? '#fff' : color.secondary}
        />
        <Text style={nameStyle}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(7,104,159,0.2)'
  },
  active: {
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 126, 103, 0.2)'
  },
  name: {
    marginLeft: 5
  }
});

CategoryItem.defaultProps = {
  isActive: false,
  isLastItem: false,
  onSelect: () => {}
};

export default CategoryItem;
