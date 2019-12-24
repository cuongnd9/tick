import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Input, Icon, Button } from 'react-native-ui-kitten';
import { useDispatch } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { createCategoryAction, getListAction } from 'src/models/category';
import { Header, StatusBar } from 'src/components';
import { color } from 'src/config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const NewCategoryScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [reset, setReset] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setName('');
  }, [reset]);

  const handleSubmit = () => {
    dispatch(
      createCategoryAction({
        name,
        callback: () => {
          setReset(!reset);
          dispatch(getListAction());
        }
      })
    );
  };

  return (
    <Layout style={styles.container}>
      <StatusBar />
      <Header
        title='New category'
        leftIconName='arrow-back-outline'
        leftPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={{ ...styles.label, marginTop: 0 }} category='label'>
          Enter name
        </Text>
        <Input
          placeholder='Name'
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          icon={() => <Icon name='bulb-outline' fill={color.secondary} />}
        />
        <Button disabled={!name} onPress={handleSubmit} style={styles.submit}>
          ADD CATEGORY
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
  label: {
    marginBottom: 10,
    marginTop: 20
  },
  content: {
    flex: 1,
    padding: 15
  },
  input: {
    borderColor: 'rgba(7,104,159,0.2)',
    borderRadius: 10
  },
  submit: {
    backgroundColor: color.secondary,
    borderColor: color.secondary,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10
  }
});

export default NewCategoryScreen;
