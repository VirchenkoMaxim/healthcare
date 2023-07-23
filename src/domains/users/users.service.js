class UsersService {
  constructor(usersRepository) {
    this._usersRepository = usersRepository
  }

  async createOne(body) {
    return this._usersRepository.createOne(body)
  }

  async updateOne(id, body) {
    return this._usersRepository.updateOneById(id, body)
  }

  async getOne(id) {
    return this._usersRepository.findOneById(id)
  }

  async getAll() {
    return this._usersRepository.findList({})
  }

  async isExists(id) {
    return !!(await this._usersRepository.findOneById(id))
  }
}

module.exports = UsersService
