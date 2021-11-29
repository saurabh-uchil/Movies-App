/* loading and initialising the library */
const pgp = require('pg-promise')()

/* Connection string */
const connection = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

/* Creating new database instance */
const db = pgp(connection)

/* Export it anywhere you want to use it */
module.exports = db