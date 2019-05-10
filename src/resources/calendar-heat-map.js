const CalendarHeatMap = {
  parse: dates => {
    const spentMoneyInMonth = Object.values(dates).reduce(
      (total, db) => total + db.total,
      0
    )

    return Object.entries(dates)
      .map(([date, db]) => [
        date,
        db.total && Math.round((db.total / spentMoneyInMonth) * 100),
      ])
      .reduce((hash, [date, ratio]) => {
        // eslint-disable-next-line no-param-reassign
        hash[date] = ratio
        return hash
      }, {})
  },
}

export default CalendarHeatMap
