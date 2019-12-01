import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddStepItem from './AddStepItem';
import StepItem from './StepItem';

const StepList: React.FC = () => {
  return (
    <View style={styles.container}>
      <StepItem />
      <AddStepItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
});

export default StepList;
