import { createStackNavigator } from 'react-navigation-stack';
import { CategoryScreen } from 'src/screens';

const CategoryNavigator = createStackNavigator(
  {
    Category: {
      screen: CategoryScreen,
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
