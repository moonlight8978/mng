import CalendarHeatMap from './calendar-heat-map'

describe('.parse', function testParse() {
  beforeAll(() => {
    this.subject = CalendarHeatMap.parse
  })

  test('empty map', () => {
    const heatmap = CalendarHeatMap.parse({})
    expect(heatmap).toEqual({})
  })

  test('map has values', () => {
    const heatmap = CalendarHeatMap.parse({
      1: { total: 100000 },
      2: { total: 200000 },
    })
    expect(heatmap).toEqual({
      1: 33,
      2: 67,
    })
  })
})
