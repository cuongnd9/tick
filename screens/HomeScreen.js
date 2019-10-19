import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';

export default function HomeScreen() {
  return (
    <Layout style={styles.container}>
      <Text category='h4'>Welcome to UI Kitten</Text>
      <Button>BUTTON</Button>
    </Layout>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50
  }
});
