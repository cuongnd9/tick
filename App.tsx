import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import AppContainer from './navigation/AppNavigator';

function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppContainer />
    </ApplicationProvider>
  );
}

export default App;
