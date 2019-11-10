import React from 'react';
import useAsyncEffect from 'use-async-effect';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Layout, Button, Icon, Input, Text } from 'react-native-ui-kitten';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { color } from '../config/theme';

const AuthLoadingScreen: NavigationStackScreenComponent = ({ navigation }) => {
  useAsyncEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    navigation.navigate(token ? 'App' : 'Auth')
  }, []);

  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.bigTitle}>
        Loading...
      </Text>
    </Layout>
  );
};

AuthLoadingScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    fontFamily: 'dosis-regular',
    paddingTop: 60,
    backgroundColor: color.background
  },
  bigTitle: {
    color: color.secondary,
  },
});

export default AuthLoadingScreen;
