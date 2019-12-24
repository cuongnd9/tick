import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import ConfettiCannon from 'react-native-confetti-cannon';
import { NavigationStackProp } from 'react-navigation-stack';
import { Header, StatusBar } from 'src/components';
import { color } from 'src/config/theme';
import { loginAction } from 'src/models/auth/login';

interface Props {
  navigation: NavigationStackProp;
}

const CongratulationScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const username = navigation.getParam('username');
  const password = navigation.getParam('password');
  const goToApp = () => {
    dispatch(loginAction({ username, password }));
  };
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header
        title='Done'
        leftIconName='arrow-back-outline'
        leftPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text category='h3' style={styles.title}>
          Congratulations!
        </Text>
        <Text category='p1' style={styles.title}>
          You've successfully registered a Tick account.
        </Text>
        <Button
          style={styles.btn}
          textStyle={{ color: 'white' }}
          size='large'
          onPress={goToApp}
        >
          GO TO APP
        </Button>
      </View>
      <ConfettiCannon
        count={200}
        origin={{
          x: Dimensions.get('window').width / 2,
          y: Dimensions.get('window').height + 200
        }}
      />
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
  btn: {
    width: '100%',
    backgroundColor: color.primary,
    borderColor: 'rgba(255, 126, 103, 0.2)',
    marginBottom: 10,
    marginTop: 50
  }
});

export default CongratulationScreen;
