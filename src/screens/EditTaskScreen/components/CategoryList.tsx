import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from 'src/models';
import CategoryItem from './CategoryItem';

interface Props {
  onGetSelectedId?: Function;
  reset?: boolean;
  initialValue: any;
}

const CategoryList: React.FC<Props> = ({ initialValue, onGetSelectedId, reset }) => {
  const data = useSelector((state: AppState) => state.category.categoryList);
  const [selectedId, setSelectedId] = useState(initialValue.id);
  useEffect(() => {
    setSelectedId(initialValue.id);
  }, [reset]);
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onGetSelectedId(id);
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }: { item: any; index: number }) => (
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

CategoryList.defaultProps = {
  onGetSelectedId: () => {},
  reset: false
};

export default CategoryList;
