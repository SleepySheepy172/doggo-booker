// connect to the database
const { Pool } = require('pg');
const url = require('url');

const DB_URL = process.env.USER_DB_URL;

if (!DB_URL) {
  console.log('setting DB_URL from config.env');
  require('env2')('./config.env');
  DB_URL = process.env.DB_URL;
}

// check if database url always exists
if (!DB_URL) throw new Error('Environment variable DB_URL must be set');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_URL_CONNECTIONS || 2,
  user: username,
  // when key and value is the same just put it once
  password,
  ssl: params.hostname !== 'localhost'
}


// new instance of Pool taking in values from the option object
module.exports = new Pool(options);
