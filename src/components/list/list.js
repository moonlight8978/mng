import React, { PureComponent } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ZText } from '../atomics'
import { palette } from '../../config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingContainer: {
    marginTop: 6,
    marginBottom: 6,
  },
  divider: {
    backgroundColor: palette.blueGray,
    height: 1,
    width: '100%',
  },
})

const Divider = () => <View style={styles.divider} />

export default class List extends PureComponent {
  constructor(props) {
    super(props)

    this.perPage = 10

    this.state = {
      page: 1,
      isLastPage: this.checkIsLastPage(1),
      isLoading: false,
    }
  }

  handleEndReached = () => {
    const { isLoading, isLastPage } = this.state
    if (isLastPage || isLoading) {
      return
    }

    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState(state => ({
        page: state.page + 1,
        isLastPage: this.checkIsLastPage(state.page + 1),
      }))
      this.setState({ isLoading: false })
    }, 250)
  }

  checkIsLastPage = page => page * this.perPage >= this.props.data.length

  extractKey = item => item.id

  render() {
    const {
      style,
      emptyText,
      data,
      perPage,
      keyExtractor,
      ...rest
    } = this.props
    const { page, isLoading } = this.state
    const numberOfItemsShow = (perPage || this.perPage) * page
    const shownData = data.slice(0, numberOfItemsShow)

    return (
      <FlatList
        {...rest}
        keyExtractor={keyExtractor || this.extractKey}
        data={shownData}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons
              name="sentiment-dissatisfied"
              size={60}
              color={palette.gray}
            />
            <ZText size="xlarge">{emptyText}</ZText>
          </View>
        }
        ListFooterComponent={
          <>
            {shownData.length > 0 && <Divider />}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={palette.cyan} />
              </View>
            )}
          </>
        }
        ItemSeparatorComponent={Divider}
        contentContainerStyle={style}
        onEndReached={this.handleEndReached}
        onEndReachedThreshold={0.01}
      />
    )
  }
}
