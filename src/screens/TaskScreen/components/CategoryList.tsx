import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from 'src/models';
import CategoryItem from './CategoryItem';

interface Props {
  onGetSelectedId?: Function;
}

const CategoryList: React.FC<Props> = ({ onGetSelectedId }) => {
  const defaultId = 'cuongw77777777'; // FIXME
  const data = useSelector((state: AppState) => [
    {
      id: defaultId,
      name: 'ALL'
    },
    ...state.category.categoryList
  ]);
  const [selectedId, setSelectedId] = useState(defaultId);
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onGetSelectedId(id);
  };
  if (data.length <= 1) {
    return <View />;
  }
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
  onGetSelectedId: () => {}
};

export default CategoryList;
