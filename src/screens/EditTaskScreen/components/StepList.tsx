import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { diana } from 'diana-js';
import _ from 'lodash';
import AddStepItem from './AddStepItem';
import StepItem from './StepItem';

interface Props {
  onGetStepList?: Function;
  reset?: boolean;
  initialValue: any;
}

const StepList: React.FC<Props> = ({ initialValue, onGetStepList, reset }) => {
  const [stepList, setStepList] = useState(initialValue);
  useEffect(() => {
    const newSteps = [];
    const deleteSteps = [];
    stepList.forEach(step => {
      if (!step.status) {
        newSteps.push(_.omit(step, ['id']));
      }
    });
    const stepWithIds: string[] = stepList.map(step => step.id);
    initialValue.forEach(step => {
      if (stepWithIds.indexOf(step.id) === -1) {
        deleteSteps.push(step.id);
      }
    });
    onGetStepList({
      newSteps,
      deleteSteps
    });
  }, [stepList]);
  useEffect(() => {
    setStepList(initialValue);
  }, [reset]);
  const handleAddStep = (step: string) => {
    setStepList([...stepList, { id: diana(), title: step }]);
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
            title={item.title}
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
