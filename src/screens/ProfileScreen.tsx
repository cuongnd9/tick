import React from 'react';
import { AsyncStorage } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout>
      <Text>Task screen</Text>
      <Button
        onPress={async() => {
          await AsyncStorage.removeItem('x-access-token');
          navigation.navigate('AuthLoading');
        }}
      >
        Logout
      </Button>
    </Layout>
  );
};

export default ProfileScreen;
