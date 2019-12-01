import { createStackNavigator } from 'react-navigation-stack';
import { NewTaskScreen } from 'src/screens';

const NewTaskNavigator = createStackNavigator(
  {
    NewTask: {
      screen: NewTaskScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'NewTask'
  }
);

export default NewTaskNavigator;
