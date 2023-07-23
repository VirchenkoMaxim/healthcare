class DoctorsService {
  constructor(doctorsRepository) {
    this._doctorsRepository = doctorsRepository
  }

  async createOne(body) {
    return this._doctorsRepository.createOne(body)
  }

  async updateOne(id, body) {
    return this._doctorsRepository.updateOneById(id, body)
  }

  async getOne(id) {
    return this._doctorsRepository.findOneById(id)
  }

  async getAll() {
    return this._doctorsRepository.findList({})
  }

  async isExists(id) {
    return !!(await this._doctorsRepository.findOneById(id))
  }
}

module.exports = DoctorsService
