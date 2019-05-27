const db = {
  calendar: {
    2019: {
      5: {
        21: {
          payments: ['payment-3'],
          total: 20000,
        },
        22: {
          payments: ['payment-1', 'payment-2'],
          total: 50000,
        },
      },
    },
  },
  payments: {
    'payment-1': {
      id: 'payment-1',
      category: 'category-1',
      price: 20000,
      purpose: 'Purpose 1',
    },
    'payment-2': {
      id: 'payment-2',
      category: 'category-2',
      price: 30000,
      purpose: 'Purpose 2',
    },
    'payment-3': {
      id: 'payment-3',
      category: 'category-2',
      price: 20000,
      purpose: 'Purpose 3',
    },
  },
  categories: {
    'category-1': {
      id: 'category-1',
      icon: 'shopping-cart',
      name: 'Shopping',
    },
    'category-2': {
      id: 'category-2',
      icon: 'other',
      name: 'Other',
    },
  },
}

export default db
