const isThirtyDaysMonth = month => [4, 6, 9, 11].includes(month)

const isThirtyOneDaysMonth = month => [1, 3, 5, 7, 8, 10, 12].includes(month)

const isLeapYear = year => year % 100 !== 0 && year % 4 === 0

const reformatDayOfWeek = day => {
  // Mon 1 - Tue 2 - Wed 3 - Thu 4 - Fri 5 - Sat 6 - Sun 7
  return day === 0 ? 7 : day
}

const DateList = {
  NagativeAsLeadingDates(index) {
    return -1 - index
  },
  InvalidDateAsTrailingDates(index) {
    return 101 + index
  },
  getNumberOfDates({ month, year }) {
    if (isThirtyDaysMonth(month)) {
      return 30
    }
    if (isThirtyOneDaysMonth(month)) {
      return 31
    }
    if (isLeapYear(year)) {
      return 29
    }
    return 28
  },
  make({
    month,
    year,
    leadingMissingDates = DateList.NagativeAsLeadingDates,
    trailingMissingDates = DateList.InvalidDateAsTrailingDates,
  }) {
    if (month === null || year === null) {
      throw new Error('Month and year is required')
    }

    const numberOfDates = DateList.getNumberOfDates({ month, year })

    const startDate = new Date(`${year}/${month}/1`)
    const startDateDayOfWeek = reformatDayOfWeek(startDate.getDay())
    const endDate = new Date(`${year}/${month}/${numberOfDates}`)
    const endDateDayOfWeek = reformatDayOfWeek(endDate.getDay())

    const leadingMissingDatesCount = startDateDayOfWeek - 1
    const trailingMissingDatesCount = 7 - endDateDayOfWeek

    return [
      ...new Array(leadingMissingDatesCount)
        .fill(0)
        .map((_value, index) => leadingMissingDates(index)),
      ...new Array(numberOfDates).fill(0).map((_value, index) => index + 1),
      ...new Array(trailingMissingDatesCount)
        .fill(0)
        .map((_value, index) => trailingMissingDates(index)),
    ]
  },
}

export default DateList
