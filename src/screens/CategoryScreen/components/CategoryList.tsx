import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { AppState } from 'src/models';
import { Category } from 'src/models/category';
import CategoryItem from './CategoryItem';
import AddCategoryItem from './AddCategoryItem';

interface Props {
  navigation: NavigationStackProp;
  onGetSelectedId?: Function;
  reset?: boolean;
}

const CategoryList: React.FC<Props> = ({
  onGetSelectedId,
  reset,
  navigation
}) => {
  const data = useSelector((state: AppState) => state.category.categoryList);
  const [selectedId, setSelectedId] = useState(null);
  const [list, setList] = useState<Category[]>(data);
  useEffect(() => {
    setSelectedId(null);
  }, [reset]);
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onGetSelectedId(id);
  };
  const handleRemove = (id: string) => {
    const removedIndex = list.findIndex(item => item.id === id);
    const cloneList = _.cloneDeep(list);
    cloneList.splice(removedIndex, 1);
    setList(cloneList);
  };

  return (
    <View style={styles.container}>
      {list.map(item => (
        <CategoryItem
          navigation={navigation}
          key={item.id}
          category={item}
          onRemove={handleRemove}
          onSelect={handleSelect}
        />
      ))}
      {list.length > 0 && <AddCategoryItem navigation={navigation} />}
    </View>
  );
};

CategoryList.defaultProps = {
  onGetSelectedId: () => {},
  reset: false
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default CategoryList;
