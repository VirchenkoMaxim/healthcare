const { notificationTypes } = require('../enum/notification')
const moment = require('moment')

class NotificationService {
  constructor() {}

  sendAppointmentNotification(notificationType, appointment) {
    // eslint-disable-next-line no-console
    console.log(this.#composeMessageDelegator[notificationType](appointment))
  }

  /** templates can be moved to another files (html, etc.) and parsed using libs */
  #composeMessageDelegator = {
    [notificationTypes.SOME_DAYS_BEFORE]: ({ user, doctor, dateOffset, date }) => {
      const appointmentTime = moment(date).utcOffset(dateOffset).format('HH:mm')

      return `Hello ${user.name}! Remember that you have an appointment to ${doctor.speciality} tomorrow at ${appointmentTime}!`
    },

    [notificationTypes.SOME_HOURS_BEFORE]: ({ date, doctor, dateOffset, user }) => {
      const hoursLeft = moment(date).diff(moment().subtract(20, 'minutes'), 'hours')
      const appointmentTime = moment(date).utcOffset(dateOffset).format('HH:mm')

      return `Hello ${user.name}! You have an appointment to ${doctor.speciality} in ${hoursLeft} hours at ${appointmentTime}!`
    },
  }
}

module.exports = NotificationService
