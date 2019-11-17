import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import useAsyncEffect from 'use-async-effect';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { useSelector } from 'react-redux';
import { AppState } from './models';
import AppContainer from './navigation/AppContainer';
import { GlobalLoading, GlobalNotification } from './components';
import Navigation from './helpers/Navigation';

const customMapping = {
  ...mapping,
  strict: {
    ...mapping.strict,
    'text-font-family': 'dosis-regular'
  }
};

function Main() {
  const loadingState = useSelector((state: AppState) => state.global.loading);
  const notificationState = useSelector(
    (state: AppState) => state.global.notification
  );
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const loadFont = async () => {
    await Font.loadAsync({
      'dosis-bold': require('./assets/fonts/Dosis-Bold.ttf'),
      'dosis-extra-bold': require('./assets/fonts/Dosis-ExtraBold.ttf'),
      'dosis-extra-light': require('./assets/fonts/Dosis-ExtraLight.ttf'),
      'dosis-light': require('./assets/fonts/Dosis-Light.ttf'),
      'dosis-medium': require('./assets/fonts/Dosis-Medium.ttf'),
      'dosis-regular': require('./assets/fonts/Dosis-Regular.ttf'),
      'dosis-semi-bold': require('./assets/fonts/Dosis-SemiBold.ttf')
    });
    setFontLoaded(true);
  };
  useAsyncEffect(async () => {
    await loadFont();
  }, []);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={customMapping} theme={lightTheme}>
        {fontLoaded ? (
          <>
            <AppContainer
              ref={navigatorRef => {
                Navigation.setTopLevelNavigator(navigatorRef);
              }}
            />
            <GlobalLoading
              visible={loadingState.visible}
              content={loadingState.content}
              size={loadingState.size}
              status={loadingState.status}
            />
            <GlobalNotification
              visible={notificationState.visible}
              content={notificationState.content}
              status={notificationState.status}
            />
          </>
        ) : (
          <AppLoading />
        )}
      </ApplicationProvider>
    </>
  );
}

export default Main;
