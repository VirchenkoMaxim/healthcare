const { createContainer, Lifetime, InjectionMode } = require('awilix')
const { join } = require('path')

const dependencies = [
  join(__dirname, './domains/*/*.controller.js'),
  join(__dirname, './domains/*/*.filter.js'),
  join(__dirname, './domains/*/*.service.js'),
  join(__dirname, './domains/*/*.repository.js'),
  join(__dirname, './services/*.service.js'),
]

const container = createContainer()

container.loadModules(dependencies, {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC,
  },
})

exports.container = container
