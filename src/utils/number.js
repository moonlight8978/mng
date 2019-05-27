import i18n from 'i18n-js'

const NumberUtils = {
  toLocaleString: number => {
    const localeNumber = i18n.toNumber(number, {
      delimiter: '.',
      separator: ',',
      precision: 0,
    }) // 1.000
    const [integer, decimal] = localeNumber.split(',')
    const integerParts = integer ? integer.split('.') : []
    const decimalParts = decimal ? decimal.split('.') : []
    return [integerParts, decimalParts]
  },
  toShorten: number => {
    let value = number
    let unit = ''

    if (number <= 0) {
      throw new Error(`${number} must be greater than 0`)
    }

    if (number < 1000000) {
      value = number / 1000
      unit = 'K'
    } else if (number < 1000000000) {
      value = number / 1000000
      unit = 'M'
    } else {
      value = number / 1000000000
      unit = 'B'
    }

    return { value, unit }
  },
}

export default NumberUtils
