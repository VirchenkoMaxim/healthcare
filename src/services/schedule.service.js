const Agenda = require('agenda')
const { config, logger } = require('../config')
const moment = require('moment')
const { mapKeys } = require('lodash')

class ScheduleService {
  constructor() {
    this.client = new Agenda({ db: { address: config.database.url } })

    this.client.on('fail', async (error, job) => {
      if (job.attrs.failCount > 3) return

      job.attrs.nextRunAt = moment().add(30, 'seconds').toDate()
      await job.save()
    })
  }

  define(jobName, handler) {
    this.client.define(jobName, (job) => handler(job.attrs.data))
  }

  async schedule({ name, when, data }) {
    await this.client.schedule(when, name, data)
  }

  async removeJobs(filter) {
    const jobs = await this.client.jobs(mapKeys(filter, (_, key) => `data.${key}`))
    await Promise.all(jobs.map((job) => job.remove()))
  }

  start = async () => {
    await this.client.start()
    logger.info('Schedule service running')
  }
}

module.exports = ScheduleService
