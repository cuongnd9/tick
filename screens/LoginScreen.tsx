import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { Layout, Button, Icon, Input, Text } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { loginAction } from '../models/auth/login';
import { color } from '../config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const dispatch = useDispatch();

  const changeUsername = text => {
    setUsername(text);
    text && text.length > 3 ? setValidUsername(true) : setValidUsername(false);
  };

  const changePassword = text => {
    setPassword(text);
    text && text.length > 3 ? setValidPassword(true) : setValidPassword(false);
  };

  const handleLogin = () => {
    dispatch(loginAction({ username, password }));
  };

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
        value={username}
        onChangeText={changeUsername}
        style={styles.username}
        icon={() => <Icon name='person-outline' />}
        caption={!validUsername ? 'Invalid username' : ''}
        captionTextStyle={{ color: '#FF3D71' }}
      />
      <Input
        secureTextEntry
        placeholder='Password'
        value={password}
        onChangeText={changePassword}
        style={styles.password}
        icon={() => <Icon name='lock-outline' />}
        caption={!validPassword ? 'Invalid password' : ''}
        captionTextStyle={{ color: '#FF3D71' }}
      />
      <Button
        size='small'
        appearance='ghost'
        activeOpacity={0.75}
        style={styles.forgotBtn}
        textStyle={{ color: color.secondary }}
        onPress={() => navigation.navigate('Task')}
      >
        Forgot your password?
      </Button>
      <Button
        disabled={!username || !password || !validUsername || !validPassword}
        style={
          !username || !password || !validUsername || !validPassword
            ? styles.disabledLoginBtn
            : styles.loginBnt
        }
        textStyle={{ color: 'white' }}
        size='large'
        onPress={handleLogin}
      >
        LOGIN
      </Button>
      <Button
        size='small'
        appearance='ghost'
        activeOpacity={0.75}
        style={styles.registerBnt}
        textStyle={{ color: color.secondary }}
        onPress={() => navigation.navigate('Task')}
      >
        Don't have an account? Create
      </Button>
    </Layout>
  );
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
    color: color.secondary
  },
  title: {
    color: color.secondary,
    marginBottom: 50
  },
  username: {
    marginBottom: 15
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
  disabledLoginBtn: {
    width: '100%',
    backgroundColor: '#EDF1F7',
    borderColor: '#EDF1F7',
    marginBottom: 10
  },
  forgotBtn: {
    marginBottom: 50,
    paddingHorizontal: 0,
    alignSelf: 'flex-end'
  },
  registerBnt: {
    paddingHorizontal: 0
  }
});

export default LoginScreen;
