import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AsyncStorage, StyleSheet, View, Image } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { Header, StatusBar } from 'src/components';
import { color } from 'src/config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header
        title='Profile'
        leftIconName='arrow-back-outline'
        leftPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <LinearGradient
          colors={[color.primary, color.secondary]}
          style={styles.header}
        />
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/34389409?v=4'
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>@cuongw</Text>
            <Text style={styles.info}>Software Architect </Text>
            <Button
              style={{
                backgroundColor: color.secondary,
                width: '100%',
                marginTop: 100
              }}
              onPress={async () => {
                await AsyncStorage.removeItem('x-access-token');
                navigation.navigate('AuthLoading');
              }}
            >
              Logout
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: color.background
  },
  content: {
    flex: 1,
    padding: 15
  },
  header: {
    height: 200,
    borderRadius: 10
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    fontWeight: '600'
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  info: {
    fontSize: 16,
    color: color.primary,
    marginVertical: 10
  }
});

export default ProfileScreen;
