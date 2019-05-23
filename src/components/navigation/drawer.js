import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Alert,
  BackHandler,
  TouchableNativeFeedback,
  View,
  Text,
  Image,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerItems, SafeAreaView } from 'react-navigation'

import { palette } from '../../config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: palette.black,
    marginHorizontal: 16,
  },
  label: {
    color: palette.black,
    margin: 16,
    fontWeight: '600',
  },
  headerImage: {
    height: 125,
  },
  drawer: {
    marginTop: -25,
  },
})

const exitApp = () => {
  Alert.alert('Exit app', 'Are you sure to exit the application?', [
    { text: 'No', onPress: () => {}, style: 'cancel' },
    { text: 'Yes', onPress: BackHandler.exitApp, style: 'default' },
  ])
}

const DrawerItem = ({ onPress, children }) => (
  <TouchableNativeFeedback
    onPress={onPress}
    pressColor="rgba(0, 0, 0, .32)"
    background={{ ...TouchableNativeFeedback.Ripple(), color: 1375731712 }}
  >
    {children}
  </TouchableNativeFeedback>
)

const Drawer = props => (
  <ScrollView contentContainerStyle={styles.container}>
    <View>
      <View>
        <Image
          source={require('../../../assets/drawer-header.png')}
          style={styles.headerImage}
        />
      </View>
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never' }}
        style={styles.drawer}
      >
        <DrawerItems {...props} />
      </SafeAreaView>
    </View>

    <DrawerItem onPress={exitApp}>
      <View style={styles.exitButton}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="close" style={styles.icon} size={24} />
        </View>
        <Text style={styles.label}>Close app</Text>
      </View>
    </DrawerItem>
  </ScrollView>
)

export default Drawer
