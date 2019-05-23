import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation'

import {
  HomeScreen,
  AddPaymentScreen,
  CategoriesScreen,
  AddCategoryScreen,
} from './screens'
import { palette } from './config'

const stackNavigationStyle = {
  headerStyle: {
    backgroundColor: palette.cyan,
  },
  headerTintColor: palette.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const PaymentsNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    AddPayment: AddPaymentScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: stackNavigationStyle,
  }
)

const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    AddCategory: AddCategoryScreen,
  },
  {
    initialRouteName: 'Categories',
    defaultNavigationOptions: stackNavigationStyle,
  }
)

const AppNavigator = createDrawerNavigator(
  {
    Payments: PaymentsNavigator,
    Categories: CategoriesNavigator,
  },
  {
    initialRouteName: 'Payments',
  }
)

export default createAppContainer(AppNavigator)
