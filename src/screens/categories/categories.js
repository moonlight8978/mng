import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import i18n from 'i18n-js'

import { ZBox, ZText } from '../../components/atomics'
import { DrawerToggler, HeaderRightIcon } from '../../components/navigation'
import { palette } from '../../config'
import { Layout } from '../../components/layout'

import CategoryItem from './category-item'
import { DbConsumer } from '../../db'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

class Categories extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t('category.list.screenTitle'),
    headerLeft: <DrawerToggler color={palette.white} />,
    headerRight: (
      <HeaderRightIcon
        icon={<MaterialIcons name="add" size={28} color={palette.white} />}
        onPress={() => navigation.navigate('AddCategory')}
      />
    ),
  })

  render() {
    return (
      <Layout>
        <DbConsumer>
          {({ db, dbSelectors }) => {
            const categories = dbSelectors.findCategories(db)

            if (categories.length === 0) {
              return (
                <View style={styles.empty}>
                  <MaterialIcons
                    name="sentiment-dissatisfied"
                    size={60}
                    color={palette.gray}
                  />
                  <ZText size="xlarge">{i18n.t('category.list.empty')}</ZText>
                </View>
              )
            }

            return categories.map(category => (
              <ZBox style={styles.container}>
                <CategoryItem key={category.id} category={category} />
              </ZBox>
            ))
          }}
        </DbConsumer>
      </Layout>
    )
  }
}

export default Categories
