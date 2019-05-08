const CalendarHeatMap = {
  parse: dates => {
    const spentMoneyInMonth = Object.values(dates).reduce(
      (total, db) => total + db.data,
      0
    )

    return Object.entries(dates)
      .map(([date, db]) => [date, db.price && db.price / spentMoneyInMonth])
      .reduce((hash, [date, ratio]) => {
        // eslint-disable-next-line no-param-reassign
        hash[date] = ratio
        return hash
      }, {})
  },
}

export default CalendarHeatMap
