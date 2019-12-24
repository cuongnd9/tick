import React from 'react';
import { StyleSheet, View, Text as TextCore } from 'react-native';
import { Layout, Text, Button, Input, Icon } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { Header, StatusBar } from 'src/components';
import { color } from 'src/config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const EnterCodeScreen: React.FC<Props> = ({ navigation }) => {
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
          Open your email and enter your code
        </Text>
        <Input
          placeholder='Code'
          style={styles.input}
          icon={() => <Icon name='person-outline' />}
          caption={'Invalid code'}
          captionTextStyle={{ color: '#FF3D71' }}
        />
        <View style={styles.resendContainer}>
          <Text category='p2' style={{ ...styles.title, marginTop: 17 }}>
            Code is expired after 100 seconds.
          </Text>
          <Button
            size='small'
            appearance='ghost'
            activeOpacity={0.75}
            style={styles.resendBtn}
            textStyle={{ color: color.secondary }}
          >
            Resend code
          </Button>
        </View>
        <Button style={styles.btn} textStyle={{ color: 'white' }} size='large'>
          CONTINUE
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
    marginBottom: 10
  },
  disabledBtn: {
    width: '100%',
    backgroundColor: '#EDF1F7',
    borderColor: 'rgba(237, 241, 247, 0.2)',
    marginBottom: 10
  },
  resendContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resendBtn: {
    paddingHorizontal: 0
  }
});

export default EnterCodeScreen;
