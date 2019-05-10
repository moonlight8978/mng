import { DateList } from '.'

describe('.make', function testMake() {
  beforeAll(() => {
    this.subject = DateList.make
  })

  test('2019 May', () => {
    const dateList = this.subject({ month: 5, year: 2019 })

    expect(dateList.length).toEqual(35)
    expect(dateList[0]).toEqual(-1)
    expect(dateList[1]).toEqual(-2)
    expect(dateList[2]).toEqual(1)
    expect(dateList[32]).toEqual(31)
    expect(dateList[33]).toEqual(101)
    expect(dateList[34]).toEqual(102)
  })

  test('2019 Feb', () => {
    const dateList = this.subject({ month: 2, year: 2019 })

    expect(dateList.length).toEqual(35)
    expect(dateList[0]).toEqual(-1)
    expect(dateList[3]).toEqual(-4)
    expect(dateList[4]).toEqual(1)
    expect(dateList[31]).toEqual(28)
    expect(dateList[32]).toEqual(101)
    expect(dateList[34]).toEqual(103)
  })
})
