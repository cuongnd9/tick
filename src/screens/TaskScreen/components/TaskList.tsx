import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from 'src/models';
import TaskItem from './TaskItem';

interface Props {
  onGetSelectedId?: Function;
}

const TaskList: React.FC<Props> = ({ onGetSelectedId }) => {
  const data = useSelector((state: AppState) => state.category.categoryList);
  const [selectedId, setSelectedId] = useState(null);
  const handleSelect = (id: string) => {
    setSelectedId(id);
    onGetSelectedId(id);
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <TaskItem
            isActive={item.id === selectedId}
            isLastItem={index === data.length - 1}
            task={{}}
            onSelect={handleSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

TaskList.defaultProps = {
  onGetSelectedId: () => {}
};

export default TaskList;
