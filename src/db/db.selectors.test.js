import db from './db.sample'
import selectors from './db.selectors'

describe('.findCategory', function testFindCategory() {
  beforeAll(() => {
    this.subject = selectors.findCategory
  })

  test('category exist', () => {
    expect(this.subject('category-2')(db)).toEqual({
      id: 'category-2',
      icon: 'other',
      name: 'Other',
    })
  })

  test('category not exist', () => {
    expect(this.subject('blah')(db)).toEqual(null)
  })
})

describe('.findPayment', function testFindPayment() {
  beforeAll(() => {
    this.subject = selectors.findPayment
  })

  test('payment exist', () => {
    expect(this.subject('payment-1')(db)).toEqual({
      category: {
        id: 'category-1',
        icon: 'shopping-cart',
        name: 'Shopping',
      },
      id: 'payment-1',
      price: 20000,
      purpose: 'Purpose 1',
    })
  })

  test('payment not exist', () => {
    expect(this.subject('blah')(db)).toEqual(null)
  })
})

describe('.findDate', function testFindDate() {
  beforeAll(() => {
    this.subject = selectors.findDate
  })

  test('date exist', () => {
    expect(this.subject({ year: 2019, month: 5, date: 22 })(db)).toEqual({
      total: 50000,
      payments: [
        {
          category: {
            id: 'category-1',
            icon: 'shopping-cart',
            name: 'Shopping',
          },
          id: 'payment-1',
          price: 20000,
          purpose: 'Purpose 1',
        },
        {
          category: {
            id: 'category-2',
            icon: 'other',
            name: 'Other',
          },
          id: 'payment-2',
          price: 30000,
          purpose: 'Purpose 2',
        },
      ],
    })
  })

  test('date not exist', () => {
    expect(this.subject('blah')({ year: 2019, month: 5, date: 1 })).toEqual({
      total: 0,
      payments: [],
    })
  })
})

describe('.findMonth', function testFindMonth() {
  beforeAll(() => {
    this.subject = selectors.findMonth
  })

  test('month exist', () => {
    expect(this.subject({ year: 2019, month: 5 })(db)).toEqual({
      21: {
        total: 20000,
        payments: [
          {
            category: {
              id: 'category-2',
              icon: 'other',
              name: 'Other',
            },
            id: 'payment-3',
            price: 20000,
            purpose: 'Purpose 3',
          },
        ],
      },
      22: {
        total: 50000,
        payments: [
          {
            category: {
              id: 'category-1',
              icon: 'shopping-cart',
              name: 'Shopping',
            },
            id: 'payment-1',
            price: 20000,
            purpose: 'Purpose 1',
          },
          {
            category: {
              id: 'category-2',
              icon: 'other',
              name: 'Other',
            },
            id: 'payment-2',
            price: 30000,
            purpose: 'Purpose 2',
          },
        ],
      },
    })
  })

  test('month not exist', () => {
    expect(this.subject({ year: 2018, month: 12 })(db)).toEqual({})
  })
})
