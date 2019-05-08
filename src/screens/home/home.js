import React from 'react'
import { View } from 'react-native'

import Day from './day'
import { Calendar } from '../../components'
import { withDb } from '../../db'
import { CalendarHeatMap, DateStruct } from '../../resources'

class Home extends React.PureComponent {
  state = {
    selectedDate: DateStruct.parse(),
  }

  handleChangeDate = date => {
    this.setState({ selectedDate: date })
  }

  render() {
    const { dbSelectors, db } = this.props
    const { selectedDate } = this.state
    const monthDb = dbSelectors.findMonth(selectedDate)(db)
    const heatMap = CalendarHeatMap.parse(monthDb)

    return (
      <View>
        <Calendar
          heatMap={heatMap}
          onMonthChange={this.handleChangeDate}
          onYearChange={this.handleChangeDate}
          onDatePress={this.handleChangeDate}
        />

        <Day date={selectedDate} />
      </View>
    )
  }
}

export default withDb(Home)
