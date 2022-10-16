import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { Header, StatusBar } from 'src/components';
import { color } from 'src/config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header
        title='Forgot Password'
        leftIconName='arrow-back-outline'
        leftPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text category='s2' style={styles.title}>
          This feature is not available. Please contact author harrytran103@gmail.com to
          support it.
        </Text>
        <Button
          style={styles.btn}
          textStyle={{ color: 'white' }}
          size='large'
          onPress={() => navigation.goBack()}
        >
          GOOD LUCK
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
    marginBottom: 50
  },
  btn: {
    width: '100%',
    backgroundColor: color.primary,
    borderColor: 'rgba(255, 126, 103, 0.2)',
    marginBottom: 10
  }
});

export default ForgotPasswordScreen;
