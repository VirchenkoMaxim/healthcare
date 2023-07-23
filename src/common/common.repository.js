const { isObject } = require('lodash')
const { database } = require('../database')

class CommonRepository {
  constructor(model) {
    model.schema.plugin(database.plugins.toJSONnObject)
    this.model = model
    this.name = model.modelName
  }

  async createOne(body) {
    return this.model.create(body)
  }

  async findOneById(id, options = {}) {
    return this.model.findById(id).select(options.select).populate(options.populate)
  }

  async findOneByFilter(filter) {
    return this.model.findOne(filter)
  }

  async findList(filter, options = {}) {
    return this.model
      .find(filter)
      .sort(this.composeSort(options.sortBy))
      .select(options.select)
      .populate(options.populate)
  }

  async updateOneById(id, body, options = undefined) {
    const toUpdate = await this.model.findById(id, {}, options)
    if (!toUpdate) return null

    Object.assign(toUpdate, body)
    return toUpdate.save(options)
  }

  async deleteOneById(_id) {
    return this.model.findOneAndDelete({ _id })
  }

  /**
   *
   * @param sortString
   * @returns {object}
   */
  composeSort = (sortString) => {
    if (!sortString) return { _id: -1 }
    if (isObject(sortString)) return sortString

    return sortString.split(',').reduce((acc, sort) => {
      const [key, order] = sort.split(':')
      return { ...acc, [key]: order === 'desc' ? -1 : 1 }
    }, {})
  }
}

exports.CommonRepository = CommonRepository
