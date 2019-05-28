import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import i18n from 'i18n-js'

import {
  HomeScreen,
  AddPaymentScreen,
  CategoriesScreen,
  AddCategoryScreen,
  DatePaymentsScreen,
} from './screens'
import { palette } from './config'
import { Drawer, HeaderRightIcon, DrawerToggler } from './components/navigation'

const stackNavigationStyle = {
  headerStyle: {
    backgroundColor: palette.cyan,
  },
  headerTintColor: palette.white,
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
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('category.list.screenTitle'),
        headerLeft: <DrawerToggler color={palette.white} />,
        headerRight: (
          <HeaderRightIcon
            icon={<MaterialIcons name="add" size={28} color={palette.white} />}
            onPress={() => navigation.navigate('AddCategory')}
          />
        ),
      }),
    },
    AddCategory: {
      screen: AddCategoryScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('category.new.screenTitle'),
        headerRight: (
          <HeaderRightIcon
            icon={
              <MaterialCommunityIcons
                name="check"
                size={28}
                color={palette.white}
              />
            }
            onPress={async () => {
              await navigation.getParam('submitForm')()
              navigation.goBack()
            }}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'AddCategory',
    defaultNavigationOptions: stackNavigationStyle,
  }
)

const AppNavigator = createDrawerNavigator(
  {
    Payments: {
      screen: PaymentsNavigator,
      navigationOptions: {
        drawerLabel: i18n.t('drawer.payment'),
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons color={tintColor} name="attach-money" size={24} />
        ),
      },
    },
    Categories: {
      screen: CategoriesNavigator,
      navigationOptions: {
        drawerLabel: i18n.t('drawer.category'),
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons color={tintColor} name="list" size={24} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Categories',
    contentOptions: {
      activeTintColor: palette.cyan,
      inactiveTintColor: palette.black,
      activeBackgroundColor: palette.blueGray,
      iconContainerStyle: {
        opacity: 1,
      },
    },
    contentComponent: Drawer,
    drawerBackgroundColor: palette.white,
  }
)

export default createAppContainer(AppNavigator)
