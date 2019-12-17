import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { AppState } from 'src/models';
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
  useEffect(() => {
    setSelectedId(null);
  }, [reset]);
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onGetSelectedId(id);
  };

  return (
    <View style={styles.container}>
      {data.map(item => (
        <CategoryItem
          navigation={navigation}
          key={item.id}
          category={item}
          onSelect={handleSelect}
        />
      ))}
      {data.length > 0 && <AddCategoryItem navigation={navigation} />}
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
