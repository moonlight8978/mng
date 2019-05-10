import { createStackNavigator, createAppContainer } from 'react-navigation'
import i18n from 'i18n-js'

import { HomeScreen, AddPaymentScreen } from './screens'
import { palette } from './config'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: i18n.t('home.title'),
      },
    },
    AddPayment: {
      screen: AddPaymentScreen,
    },
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: palette.cyan,
      },
      headerTintColor: palette.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

export default createAppContainer(AppNavigator)
