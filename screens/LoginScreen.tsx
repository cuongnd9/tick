import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text, Button, Icon, Input } from 'react-native-ui-kitten';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { color } from '../config/theme';

const LoginScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text category='h1' style={styles.bigTitle}>
        Welcome
      </Text>
      <Text category='p1' style={styles.title}>
        Sign in to continue
      </Text>
      <Input
        placeholder='Username'
        style={styles.username}
        icon={() => <Icon name='checkmark-outline' />}
      />
      <Input
        placeholder='Password'
        style={styles.password}
        icon={() => <Icon name='eye' />}
      />
      <Button
        size='small'
        appearance='ghost'
        activeOpacity={0.75}
        style={styles.forgotBtn}
        onPress={() => navigation.navigate('Home')}
      >
        Forgot your password?
      </Button>
      <Button
        style={styles.loginBnt}
        size='large'
        onPress={() => navigation.navigate('Home')}
      >
        LOGIN
      </Button>
      <Button
        size='small'
        appearance='ghost'
        activeOpacity={0.75}
        style={styles.registerBnt}
        onPress={() => navigation.navigate('Home')}
      >
        Don't have an account? Create
      </Button>
    </Layout>
  );
};

LoginScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: color.background
  },
  logo: {
    resizeMode: 'contain',
    height: 30,
    marginBottom: 15
  },
  bigTitle: {
    color: color.textDarker
  },
  title: {
    color: color.textDark,
    marginBottom: 50
  },
  username: {
    marginBottom: 10
  },
  password: {
    marginBottom: 10
  },
  loginBnt: {
    width: '100%',
    backgroundColor: color.primary,
    borderColor: color.primary,
    marginBottom: 10
  },
  forgotBtn: {
    marginBottom: 50,
    paddingHorizontal: 0,
    alignSelf: 'flex-end',
    color: color.secondary
  },
  registerBnt: {
    paddingHorizontal: 0,
    color: color.secondary
  }
});

export default LoginScreen;
