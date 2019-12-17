import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { NavigationStackProp } from 'react-navigation-stack';
import { SearchHeader, StatusBar } from 'src/components';
import { CategoryList } from './components';
import { color } from 'src/config/theme';

interface Props {
  navigation: NavigationStackProp;
}

const CategoryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <StatusBar />
      <SearchHeader navigation={navigation} showNoti={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <CategoryList navigation={navigation} />
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
