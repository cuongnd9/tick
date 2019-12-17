import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Icon, Text } from 'react-native-ui-kitten';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { Category } from 'src/models/category';
import { filterByCategoryAction } from 'src/models/task';
import { getListAction, deleteCategoryAction } from 'src/models/category';
import { color } from 'src/config/theme';
import { taskStatus } from 'src/config/constants';
import { categoryIcons, defaultCategoryIcon } from 'src/config/icons';

interface Props {
  navigation: NavigationStackProp;
  category: Category;
  onSelect?: Function;
  onRemove: Function;
}

const CategoryItem: React.FC<Props> = ({ category, onSelect, navigation, onRemove }) => {
  const dispatch = useDispatch();
  const [iconName, setIconName] = useState(defaultCategoryIcon);
  useEffect(() => {
    categoryIcons.forEach(categoryIcon => {
      if (categoryIcon.nameList.includes(category.name.toLowerCase())) {
        setIconName(categoryIcon.icon);
      }
    });
  }, [category.name]);
  const handleProcess = () => {
    if (category.tasks.length === 0) {
      return '0%';
    }
    const cloneTasks = _.cloneDeep(category.tasks);
    const completedTasks = cloneTasks.filter(
      task => task.status === taskStatus.done
    );
    return `${(completedTasks.length * 100) / category.tasks.length}%`;
  };
  const handlePress = () => {
    onSelect(category.id);
    navigation.navigate('EditCategory', {
      category
    });
    // dispatch(filterByCategoryAction(category.id));
    // navigation.navigate('TaskByCategory');
  };
  const handleDelete = () => {
    onRemove(category.id);
    dispatch(
      deleteCategoryAction({
        id: category.id,
        callback: () => dispatch(getListAction())
      })
    );
  };
  const renderButtonGroup = () => (
    <TouchableWithoutFeedback onPress={handleDelete}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FF3D71',
          padding: 30,
          marginBottom: 10,
          marginLeft: 10,
          borderRadius: 10
        }}
      >
        <Icon name='trash' width={24} height={24} fill='#fff' />
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <Swipeable renderRightActions={renderButtonGroup}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <View style={{ ...styles.content, marginBottom: 10 }}>
            <Icon name={iconName} width={32} height={32} fill={color.primary} />
            <Text style={{ marginLeft: 5 }} category='h4'>
              {category.name}
            </Text>
          </View>
          <View style={styles.content}>
            {category.tasks.length > 0 && (
              <>
                <Text category='s2'>{handleProcess()}</Text>
                <Icon
                  name='arrow-right'
                  width={19}
                  height={19}
                  fill={color.secondary}
                />
              </>
            )}
            <Text category='s2'>{`${category.tasks.length} tasks`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
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
