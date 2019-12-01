import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import CategoryItem from './CategoryItem';

const data = [
  {
    id: '1',
    name: 'Work'
  },
  {
    id: '5',
    name: 'Life'
  },
  {
    id: '8',
    name: 'Home'
  },
  {
    id: '18',
    name: 'Dev'
  },
  {
    id: '156',
    name: 'Laptop'
  },
  {
    id: '81',
    name: 'Phone'
  },
  {
    id: '61',
    name: 'Travel'
  }
];

const CategoryList: React.FC = () => {
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
        renderItem={({ item, index }) => (
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
