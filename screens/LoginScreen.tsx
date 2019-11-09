import React from 'react';
import { Layout, Text, Button, Icon } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        icon={() => <Icon name='facebook' />}
        onPress={() => navigation.navigate('Home')}
      >
        Login with Facebook
      </Button>
    </Layout>
  );
};

export default LoginScreen;
