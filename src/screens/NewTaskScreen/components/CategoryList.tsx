import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/models'
import { getListAction } from 'src/models/category'
import CategoryItem from './CategoryItem';

const CategoryList: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAction())
  }, []);

  const data = useSelector((state: AppState) => state.category.categoryList);
  const [selectedId, setSelectedId] = useState(null);
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index } : { item: any, index: number }) => (
          <CategoryItem
            isActive={item.id === selectedId}
            isLastItem={index === data.length - 1}
            id={item.id}
            name={item.name}
            onSelect={handleSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

export default CategoryList;
