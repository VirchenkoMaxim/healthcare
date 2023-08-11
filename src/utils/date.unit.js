const moment = require('moment')
const { saveTimeOnly, getDayOfWeek } = require('./date')

describe('saveTimeOnly', () => {
  test('returns a valid Moment object with the specified time', () => {
    const testTime = { hours: 10, minutes: 30 }
    const result = saveTimeOnly(testTime)

    expect(moment.isMoment(result)).toBe(true)

    const expectedISOString = `1970-01-01T${testTime.hours.toString().padStart(2, '0')}:${testTime.minutes
      .toString()
      .padStart(2, '0')}:00.000Z`

    expect(result.toISOString()).toBe(expectedISOString)
  })
})

describe('getDayOfWeek', () => {
  test('returns the correct day of the week', () => {
    const testDate = moment('2023-08-11')
    const result = getDayOfWeek(testDate)

    const expectedDayOfWeek = testDate.format('dddd')
    expect(result).toBe(expectedDayOfWeek)
  })
})
