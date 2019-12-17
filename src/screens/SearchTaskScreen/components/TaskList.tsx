import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import { useSelector } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { AppState } from 'src/models';
import TaskItem from './TaskItem';

interface Props {
  navigation: NavigationStackProp;
  onGetSelectedId?: Function;
  listType: string;
}

const TaskList: React.FC<Props> = ({
  onGetSelectedId,
  listType,
  navigation
}) => {
  const [taskList, setTaskList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { searchList: list } = useSelector((state: AppState) => state.task);
  const { data = [] } =
    (list && list.find(item => item.type === listType)) || {};

  useEffect(() => {
    setTaskList(data);
  }, [data]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onGetSelectedId(id);
  };
  const removeTask = (id: string) => {
    const currentList = _.cloneDeep(taskList);
    currentList.splice(currentList.map(item => item.id).indexOf(id), 1);
    setTaskList(currentList);
  };

  return (
    <View>
      {taskList.length > 0 && (
        <Text category='label' style={{ marginBottom: 10, marginTop: 20 }}>
          {listType}
        </Text>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={taskList}
        renderItem={({ item }: { item: any }) => (
          <TaskItem
            navigation={navigation}
            listType={listType}
            task={item}
            onSelect={handleSelect}
            onRemove={removeTask}
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
