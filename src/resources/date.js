const formatDate = (date, month, year) => `${year}-${month}-${date}`

const DateStruct = {
  parse: (date = new Date()) => ({
    date: date.getDate() === 0 ? 7 : date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }),
  toString: ({ date, month, year }) => formatDate(date, month, year),
}

export default DateStruct
