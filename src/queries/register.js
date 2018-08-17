const dbConnection = require('../database/db_connection');
const bcrypt = require('bcryptjs');

const register = (email, firstName, lastName, contact, password, cb) => {
  bcrypt.hash(password, 10, (err, hashPassword) => {
    dbConnection.query('INSERT INTO users (email, first_name, last_name, contact, password) VALUES ($1, $2, $3, $4, $5)',
      [email, firstName, lastName, contact, hashPassword],
      (err, data) => {
        if (err) return cb(err);
        dbConnection.query('SELECT id FROM users WHERE email = $1', [email], (err, result) => {
          if (err) return cb(err);
          cb(null, result.rows[0]['id']);
        })
        //cb(null, data);
      })
  })
}

module.exports = register;
