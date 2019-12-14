import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import { color } from 'src/config/theme';
import { categoryIcons, defaultCategoryIcon } from 'src/config/icons';

interface Props {
  id: string;
  name: string;
  onSelect?: Function;
}

const CategoryItem: React.FC<Props> = ({ id, name, onSelect }) => {
  const [iconName, setIconName] = useState(defaultCategoryIcon);
  useEffect(() => {
    categoryIcons.forEach(categoryIcon => {
      if (categoryIcon.nameList.includes(name.toLowerCase())) {
        setIconName(categoryIcon.icon);
      }
    });
  }, [name]);
  const random = length => {
    return Math.floor(Math.random() * length);
  };
  return (
    <TouchableWithoutFeedback onPress={() => onSelect(id)}>
      <View style={styles.container}>
        <View style={{ ...styles.content, marginBottom: 10 }}>
          <Icon name={iconName} width={32} height={32} fill={color.primary} />
          <Text style={{ marginLeft: 5 }} category='h4'>
            {name}
          </Text>
        </View>
        <View style={styles.content}>
          <Text category='s2'>{`${(random(10) / 10) * 100}%`}</Text>
          <Icon
            name='arrow-right'
            width={19}
            height={19}
            fill={color.secondary}
          />
          <Text category='s2'>{`${random(10)} tasks`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('screen').width - 40) / 2,
    height: (Dimensions.get('screen').width - 40) / 2,
    padding: 12,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(7,104,159,0.2)'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  active: {
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 126, 103, 0.2)'
  }
});

CategoryItem.defaultProps = {
  onSelect: () => {}
};

export default CategoryItem;
