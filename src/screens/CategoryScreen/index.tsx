import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { SearchHeader, StatusBar } from 'src/components';
import { CategoryList } from './components';
import { color } from 'src/config/theme';

const CategoryScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader showNoti={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <CategoryList />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: color.background,
    padding: 5
  },
  main: {
    padding: 5
  }
});

export default CategoryScreen;
