import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { SearchHeader, StatusBar, TextInput } from 'src/components';
import { color } from 'src/config/theme';

interface Props {
  navigation?: NavigationStackProp;
}

const TaskScreen: React.FC<Props> = ({ navigation }) => {
  const pressSearchButton = () => {
    navigation.navigate('SearchTask');
  }

  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader isfakeSearchInput onSearchPress={pressSearchButton} />
      <Text>Task screen</Text>
      <TextInput iconName='star' />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: color.background
  }
});

export default TaskScreen;
