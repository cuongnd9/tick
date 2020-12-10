import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { diana } from 'diana-js';
import AddStepItem from './AddStepItem';
import StepItem from './StepItem';

interface Props {
  onGetStepList?: Function;
  reset?: boolean;
}

const StepList: React.FC<Props> = ({ onGetStepList, reset }) => {
  const [stepList, setStepList] = useState([]);
  useEffect(() => {
    onGetStepList(stepList.map(step => ({ title: step.content })));
  }, [stepList]);
  useEffect(() => {
    setStepList([]);
  }, [reset]);
  const handleAddStep = (step: string) => {
    setStepList([...stepList, { id: diana(), content: step }]);
  };
  const handleRemoveItem = (id: string) => {
    setStepList([...stepList].filter(step => step.id !== id));
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={stepList}
        renderItem={({ item }: { item: any }) => (
          <StepItem
            id={item.id}
            content={item.content}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={_ => diana()}
        extraData={stepList}
      />
      <AddStepItem onAddStep={handleAddStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
});

StepList.defaultProps = {
  onGetStepList: () => {},
  reset: false
};

export default StepList;
