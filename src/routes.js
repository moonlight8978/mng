import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import i18n from 'i18n-js'
import Sentry from 'sentry-expo'

import {
  HomeScreen,
  AddPaymentScreen,
  CategoriesScreen,
  AddCategoryScreen,
  DatePaymentsScreen,
} from './screens'
import { palette } from './config'
import { Drawer, HeaderRightIcon, DrawerToggler } from './components/navigation'
import { DateStruct } from './resources'

const stackNavigationStyle = {
  headerStyle: {
    backgroundColor: palette.cyan,
  },
  headerTintColor: palette.white,
}

const submitFormFromHeader = navigation => async () => {
  try {
    await navigation.getParam('submitForm')()
    navigation.goBack()
  } catch (error) {
    Sentry.captureException(error)
  }
}

const addIcon = <MaterialIcons name="add" size={28} color={palette.white} />

const checkIcon = (
  <MaterialCommunityIcons name="check" size={28} color={palette.white} />
)

const PaymentsNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('home.title'),
        headerLeft: <DrawerToggler color={palette.white} />,
        headerRight: (
          <HeaderRightIcon
            icon={addIcon}
            onPress={() =>
              navigation.navigate('AddPayment', {
                targetDate: navigation.getParam('getSelectedDate')(),
              })
            }
          />
        ),
      }),
    },
    AddPayment: {
      screen: AddPaymentScreen,
      navigationOptions: ({ navigation }) => ({
        title: DateStruct.toString(navigation.getParam('targetDate')),
        headerRight: (
          <HeaderRightIcon
            icon={checkIcon}
            onPress={submitFormFromHeader(navigation)}
          />
        ),
      }),
    },
    DatePayments: {
      screen: DatePaymentsScreen,
      navigationOptions: ({ navigation }) => ({
        title: DateStruct.toString(navigation.getParam('targetDate')),
        headerRight: (
          <HeaderRightIcon
            icon={addIcon}
            onPress={() =>
              navigation.navigate('AddPayment', {
                targetDate: navigation.getParam('targetDate'),
              })
            }
          />
        ),
      }),
    },
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
            icon={addIcon}
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
            icon={checkIcon}
            onPress={submitFormFromHeader(navigation)}
          />
        ),
      }),
    },
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
    initialRouteName: 'Payments',
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
