import React from 'react'
import { StyleSheet } from 'react-native'
import i18n from 'i18n-js'

import { ZBox } from '../../components/atomics'
import { Layout } from '../../components/layout'

import CategoryItem from './category-item'
import { DbConsumer } from '../../db'
import { List } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
})

class Categories extends React.PureComponent {
  render() {
    return (
      <Layout>
        <DbConsumer>
          {({ db, dbSelectors }) => (
            <ZBox style={styles.container}>
              <List
                data={dbSelectors.findCategories(db)}
                renderItem={({ item }) => <CategoryItem category={item} />}
                emptyText={i18n.t('category.list.empty')}
                style={styles.list}
              />
            </ZBox>
          )}
        </DbConsumer>
      </Layout>
    )
  }
}

export default Categories
