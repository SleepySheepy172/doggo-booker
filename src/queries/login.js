const dbConnection = require('../database/db_connection');
const bcrypt = require('bcryptjs');

const verifyLogin = (email, password, cb) => {
  // ask db for hashed password (to match with the input) and email (to use unique info)
  dbConnection.query('SELECT password, id FROM users WHERE email=$1;', [email], (err, queryResult) => {
    if (err) return cb(err);
    bcrypt.compare(password, queryResult.rows[0]['password'], (err, checkPw) => {
      if (err) return cb(err);
      if (checkPw) {
        cb(null, queryResult.rows[0]['id']);
      } else {
        cb(null, false);
      }
    })
  })

}



module.exports = verifyLogin;
