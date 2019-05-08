const DateStruct = {
  parse: (date = new Date()) => ({
    date: date.getDate() === 0 ? 7 : date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }),
}

export default DateStruct
