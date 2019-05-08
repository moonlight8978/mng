const findMonth = ({ month, year }) => state => {
  const key = `${year}/${month}`
  return state[key] || {}
}

const findDate = date => dates => dates[date] || { data: [], total: 0 }

const calculateMonthTotal = ({ month, year }) => state => {
  const monthDb = findMonth(state)
  const spentMoneyInMonth = Object.values(monthDb).reduce(
    (total, db) => total + db.data,
    0
  )
  return spentMoneyInMonth
}

export default {
  findDate,
  findMonth,
  calculateMonthTotal,
}
