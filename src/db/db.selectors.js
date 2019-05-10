const getMonthKey = ({ month, year }) => `${year}/${month}`

const findMonth = ({ month, year }) => state => {
  const key = getMonthKey({ month, year })
  return state[key] || {}
}

const findDate = date => dates => dates[date] || { data: [], total: 0 }

const calculateMonthTotal = ({ month, year }) => state => {
  const monthDb = findMonth({ month, year })(state)
  const spentMoneyInMonth = Object.values(monthDb).reduce(
    (total, db) => total + db.total,
    0
  )
  return spentMoneyInMonth
}

const add = (dateStruct, payment) => db => {
  const { date } = dateStruct
  const key = getMonthKey(dateStruct)
  const monthDb = db[key] || {}
  const dateDb = monthDb[date] || { total: 0, data: [] }

  return {
    ...db,
    [key]: {
      ...monthDb,
      [date]: {
        data: [payment.data, ...dateDb.data],
        total: Math.round(dateDb.total + parseFloat(payment.price)),
      },
    },
  }
}

export default {
  findDate,
  findMonth,
  calculateMonthTotal,
  getMonthKey,
  add,
}
