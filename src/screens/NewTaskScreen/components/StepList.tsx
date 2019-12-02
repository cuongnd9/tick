import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { thinid } from 'thinid';
import AddStepItem from './AddStepItem';
import StepItem from './StepItem';

const StepList: React.FC = () => {
  const [stepList, setStepList] = useState([]);
  const handleRemoveItem = id => {
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
        keyExtractor={_ => thinid()}
        extraData={stepList}
      />
      <AddStepItem
        onAddStep={step =>
          setStepList([...stepList, { id: thinid(), content: step }])
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
});

export default StepList;
