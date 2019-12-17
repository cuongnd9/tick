import { createStackNavigator } from 'react-navigation-stack';
import { CategoryScreen, NewCategoryScreen } from 'src/screens';

const CategoryNavigator = createStackNavigator(
  {
    Category: {
      screen: CategoryScreen,
      navigationOptions: {
        header: null
      }
    },
    NewCategory: {
      screen: NewCategoryScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Category'
  }
);

export default CategoryNavigator;
