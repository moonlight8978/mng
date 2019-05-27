import NumberUtils from './number'

describe('.toLocaleString', function testToLocaleString() {
  beforeAll(() => {
    this.subject = NumberUtils.toLocaleString
  })

  test('integer number', () => {
    expect(this.subject(10100100)).toEqual([['10', '100', '100'], []])
  })

  test('decimal number', () => {
    expect(this.subject(10100100.123)).toEqual([['10', '100', '100'], []])
  })
})

describe('.toShorten', function testToShorten() {
  beforeAll(() => {
    this.subject = NumberUtils.toShorten
  })

  test('thousand', () => {
    expect(this.subject(10000)).toEqual({ value: 10, unit: 'K' })
    expect(this.subject(10500)).toEqual({ value: 10.5, unit: 'K' })
    expect(this.subject(999000)).toEqual({ value: 999, unit: 'K' })
  })

  test('million', () => {
    expect(this.subject(1000000)).toEqual({ value: 1, unit: 'M' })
    expect(this.subject(15000000)).toEqual({ value: 15, unit: 'M' })
  })

  test('billion', () => {
    expect(this.subject(1000000000)).toEqual({ value: 1, unit: 'B' })
  })
})
