import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button, Input, Icon } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { Header, StatusBar } from 'src/components';
import { color } from 'src/config/theme';
import { registerAction } from 'src/models/auth/register';

interface Props {
  navigation: NavigationStackProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = navigation.getParam('email');
  const code = navigation.getParam('code');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const changeUsername = text => {
    setUsername(text);
    text && text.length > 3 ? setValidUsername(true) : setValidUsername(false);
  };

  const changePassword = text => {
    setPassword(text);
    text && text.length > 3 ? setValidPassword(true) : setValidPassword(false);
  };

  const handleRegister = () => {
    dispatch(registerAction({ username, password, email, code }));
  };
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header
        title='Register'
        leftIconName='arrow-back-outline'
        leftPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text category='s2' style={styles.title}>
          Enter your account to register
        </Text>
        <Input
          value={username}
          placeholder='Username'
          onChangeText={changeUsername}
          style={styles.input}
          icon={() => <Icon name='person-outline' />}
          caption={!validUsername ? 'Invalid username' : ''}
          captionTextStyle={{ color: '#FF3D71' }}
        />
        <Input
          value={password}
          secureTextEntry
          placeholder='Password'
          onChangeText={changePassword}
          style={styles.input}
          icon={() => <Icon name='lock-outline' />}
          caption={!validPassword ? 'Invalid password' : ''}
          captionTextStyle={{ color: '#FF3D71' }}
        />
        <Button
          disabled={!username || !password || !validUsername || !validPassword}
          style={
            !username || !password || !validUsername || !validPassword
              ? styles.disabledBtn
              : styles.btn
          }
          textStyle={{ color: 'white' }}
          size='large'
          onPress={handleRegister}
        >
          REGISTER
        </Button>
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
  title: {
    color: color.secondary,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 15
  },
  btn: {
    width: '100%',
    backgroundColor: color.primary,
    borderColor: 'rgba(255, 126, 103, 0.2)',
    marginTop: 50,
    marginBottom: 10
  },
  disabledBtn: {
    width: '100%',
    backgroundColor: '#EDF1F7',
    borderColor: 'rgba(237, 241, 247, 0.2)',
    marginTop: 50,
    marginBottom: 10
  }
});

export default RegisterScreen;
