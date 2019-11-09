import React from 'react';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to UI Kitten</Text>
      <Text>Login Screen</Text>
        <Button onPress={() => navigation.navigate('Home')}>Go Home screen</Button>
    </Layout>
  );
};

export default LoginScreen;
