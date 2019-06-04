const en = {
  payment: {
    category: {
      label: 'Category',
      errors: {
        required: 'Please choose one category',
      },
    },
    purpose: {
      label: 'Payment purpose',
      errors: {
        required: 'Purpose cannot be blank',
      },
    },
    price: {
      label: 'Price (* 1000)',
      errors: {
        number: 'Price must be a number',
        required: 'Price cannot be blank',
        greaterThanZero: 'Price must be greater than 0',
      },
    },
  },
  category: {
    name: {
      label: 'Category name',
      errors: {
        required: 'Category name cannot be blank',
      },
    },
    iconName: {
      label: 'Icon',
      errors: {
        required: 'Please choose one icon',
      },
    },
  },
  common: {
    errors: {
      validationFailed: 'Validation failed',
    },
  },
}

const vi = {}

export default { en, vi }
