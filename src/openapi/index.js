const { mapValues, concat, pick } = require('lodash')
const { config } = require('../config')
const j2s = require('joi-to-swagger')

const swaggerDef = {
  openapi: '3.0.3',
  info: { title: 'Healthcare server API documentation' },
  servers: [{ url: `http://localhost:${config.apiPort}` }],
}

const composeSwaggerPath = (schema) => ({
  ...pick(schema, ['tags', 'description']),
  ..._composeSwaggerFormJoi(pick(schema, ['params', 'body', 'query'])),
})

module.exports = { swaggerDef, composeSwaggerPath }

const _composeSwaggerFormJoi = (joiSchemas) => {
  const { query, body, params } = mapValues(joiSchemas, (item) => j2s(item).swagger)

  const queryDocs = query
    ? Object.entries(query.properties).map(([name, schema]) => ({
        schema,
        in: 'query',
        name,
        required: !!query.required?.includes(name),
      }))
    : []

  const paramsDocs = params
    ? Object.entries(params.properties).map(([name, schema]) => ({
        schema,
        in: 'path',
        name,
        required: true,
      }))
    : []

  return {
    ...(body && { requestBody: { content: { 'application/json': { schema: body } }, required: true } }),
    ...((query || params) && { parameters: concat(paramsDocs, queryDocs) }),
    responses: { default: { description: 'Default Response' } },
  }
}
