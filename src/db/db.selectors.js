const getIn = (original, ...keys) => {
  return keys.reduce((result, key) => (result ? result[key] : null), original)
}

const findCategory = id => db => db.categories[id] || null

const findPayment = id => db => {
  const result = db.payments[id]
  if (!result) {
    return null
  }

  const { category: categoryId, ...rest } = result
  return {
    ...rest,
    category: findCategory(categoryId)(db),
  }
}

const findDate = ({ month, year, date }) => db => {
  const result = getIn(db.calendar, year, month, date)
  if (!result) {
    return {
      total: 0,
      payments: [],
    }
  }

  const { total, payments } = result
  return {
    total,
    payments: payments.map(id => findPayment(id)(db)),
  }
}

const findMonth = ({ month, year }) => db => {
  const result = getIn(db.calendar, year, month)
  if (!result) {
    return {}
  }

  return Object.keys(result)
    .map(date => [date, findDate({ month, year, date })(db)])
    .reduce((hash, [date, dateDb]) => {
      // eslint-disable-next-line no-param-reassign
      hash[date] = dateDb
      return hash
    }, {})
}

const addPayment = ({ date, month, year }, payment) => db => {
  const { total, payments } = findDate({ date, month, year })
  return {
    ...db,
    calendar: {
      ...db.calendar,
      [year]: {
        ...(getIn(db.calendar, year) || {}),
        [month]: {
          ...(getIn(db.calendar, year, month) || {}),
          [date]: {
            total: total + payment.price,
            payments: [...payments, payment.id],
          },
        },
      },
    },
    payments: {
      ...db.payments,
      [payment.id]: payment,
    },
  }
}

const calculateMonthTotal = ({ year, month }) => db => {
  const monthPayments = findMonth({ year, month })(db)
  if (!monthPayments) {
    return 0
  }

  return Object.values(monthPayments).reduce(
    (monthTotal, date) => monthTotal + date.total,
    0
  )
}

const findCategories = db => Object.values(db.categories)

export default {
  findCategory,
  findPayment,
  findDate,
  findMonth,
  addPayment,
  calculateMonthTotal,
  findCategories,
}
