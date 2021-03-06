import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import Day from './day'
import { Calendar, Layout } from '../../components'
import { ZBox } from '../../components/atomics'
import { DbConsumer } from '../../db'
import { CalendarHeatMap, DateStruct } from '../../resources'

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  day: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
})

class Home extends React.PureComponent {
  state = {
    selectedDate: DateStruct.parse(),
  }

  componentDidMount() {
    this.props.navigation.setParams({
      getSelectedDate: () => this.state.selectedDate,
    })
  }

  handleChangeDate = date => {
    this.setState({ selectedDate: date })
  }

  render() {
    const { selectedDate } = this.state

    return (
      <Layout>
        <ZBox style={styles.calendar}>
          <DbConsumer>
            {({ db, dbSelectors }) => {
              const monthDb = dbSelectors.findMonth(selectedDate)(db)
              const heatMap = CalendarHeatMap.parse(monthDb)

              return (
                <Calendar
                  heatMap={heatMap}
                  onMonthChange={this.handleChangeDate}
                  onYearChange={this.handleChangeDate}
                  onDatePress={this.handleChangeDate}
                />
              )
            }}
          </DbConsumer>
        </ZBox>

        <ScrollView>
          <ZBox style={styles.day}>
            <Day targetDate={selectedDate} />
          </ZBox>
        </ScrollView>
      </Layout>
    )
  }
}

export default Home
