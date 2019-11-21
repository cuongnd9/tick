import React from 'react';
import { StyleSheet, StatusBar as StatusBarCore, Platform, View } from 'react-native';

const StatusBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBarCore translucent backgroundColor='white' barStyle='dark-content' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 20 : StatusBarCore.currentHeight
  }
});

export default StatusBar;
