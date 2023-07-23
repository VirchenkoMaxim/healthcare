const dotenv = require('dotenv')
const path = require('path')
const { cleanEnv, str } = require('envalid')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const env = cleanEnv(process.env, {
  API_PORT: str(),
  MONGO_URL: str(),
})

module.exports = {
  apiPort: env.API_PORT,
  database: { url: env.MONGO_URL },
}
