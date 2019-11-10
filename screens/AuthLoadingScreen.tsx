import React from 'react';
import { SplashScreen } from 'expo';
import useAsyncEffect from 'use-async-effect';
import { AsyncStorage, View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

const AuthLoadingScreen: React.FC<Props> = ({ navigation }) => {
  useAsyncEffect(async () => {
    SplashScreen.preventAutoHide();
    const token = await AsyncStorage.getItem('token');
    navigation.navigate(token ? 'App' : 'Auth')
    SplashScreen.hide();
  }, []);

  return <View />
};

export default AuthLoadingScreen;
