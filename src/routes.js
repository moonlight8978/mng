import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'

import {
  HomeScreen,
  AddPaymentScreen,
  CategoriesScreen,
  AddCategoryScreen,
  DatePaymentsScreen,
} from './screens'
import { palette } from './config'
import { Drawer } from './components/navigation'

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
    DatePayments: DatePaymentsScreen,
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
    Payments: {
      screen: PaymentsNavigator,
      navigationOptions: {
        drawerLabel: 'Payments',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons color={tintColor} name="attach-money" size={24} />
        ),
      },
    },
    Categories: {
      screen: CategoriesNavigator,
      navigationOptions: {
        drawerLabel: 'Category',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons color={tintColor} name="list" size={24} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Payments',
    contentOptions: {
      activeTintColor: palette.cyan,
      inactiveTintColor: palette.black,
      activeBackgroundColor: palette.blueGrey,
      iconContainerStyle: {
        opacity: 1,
      },
    },
    contentComponent: Drawer,
    drawerBackgroundColor: palette.white,
  }
)

export default createAppContainer(AppNavigator)
