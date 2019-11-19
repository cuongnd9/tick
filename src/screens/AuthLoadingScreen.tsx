import React from 'react';
import { SplashScreen } from 'expo';
import useAsyncEffect from 'use-async-effect';
import { AsyncStorage, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

const AuthLoadingScreen: React.FC<Props> = ({ navigation }) => {
  useAsyncEffect(async () => {
    SplashScreen.preventAutoHide();
    const token = await AsyncStorage.getItem('x-access-token');
    navigation.navigate(token ? 'TaskStack' : 'AuthStack')
    SplashScreen.hide();
  }, []);

  return <View />
};

export default AuthLoadingScreen;
