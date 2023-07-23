const moment = require('moment')

/**
 *
 * @param {Moment} date
 * @returns {string}
 */
const getDayOfWeek = (date) => date.format('dddd')

/**
 * returns date that can be parsed to iso string like 1970-01-01T{hours}:{minutes}:00.000Z
 * @param hours
 * @param minutes
 * @returns {moment.Moment}
 */
const saveTimeOnly = ({ hours, minutes }) => {
  return moment().utc().set({
    year: 1970,
    month: 0,
    date: 1,
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  })
}

module.exports = { saveTimeOnly, getDayOfWeek }
