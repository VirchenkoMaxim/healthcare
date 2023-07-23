/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]]
    return
  }
  deleteAtPath(obj[path[index]], path, index + 1)
}

const transform = (schema, transformNative) => (doc, ret, options) => {
  Object.keys(schema.paths).forEach((path) => {
    if (schema.paths[path].options && schema.paths[path].options.private) {
      deleteAtPath(ret, path.split('.'), 0)
    }
  })

  if (ret._id) {
    ret.id = ret._id.toString()
    delete ret._id
  }

  delete ret.__v

  return transformNative && transformNative(doc, ret, options)
}

module.exports = function (schema) {
  const transformNative = schema.options.toJSON?.transform

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform: transform(schema, transformNative),
  })

  schema.options.toObject = Object.assign(schema.options.toObject || {}, {
    transform: transform(schema, transformNative),
  })
}
