import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import useAsyncEffect from 'use-async-effect';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import AppContainer from './navigation/AppContainer';

function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const loadFont = async () => {
    await Font.loadAsync({
      'dosis-bold': require('./assets/fonts/Dosis-Bold.ttf'),
      'dosis-extra-bold': require('./assets/fonts/Dosis-ExtraBold.ttf'),
      'dosis-extra-light': require('./assets/fonts/Dosis-ExtraLight.ttf'),
      'dosis-light': require('./assets/fonts/Dosis-Light.ttf'),
      'dosis-medium': require('./assets/fonts/Dosis-Medium.ttf'),
      'dosis-regular': require('./assets/fonts/Dosis-Regular.ttf'),
      'dosis-semi-bold': require('./assets/fonts/Dosis-SemiBold.ttf'),
    });
    setFontLoaded(true);
  }
  useAsyncEffect(async () => {
    await loadFont();
  }, []);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        {
          fontLoaded ? <AppContainer /> : <AppLoading />
        }
      </ApplicationProvider>
    </>
  );
}

export default App;
