const dbConnection = require('../database/db_connection');

getUserName = (user_id, cb) => {
  dbConnection.query('SELECT first_name FROM users WHERE id = $1;', [user_id], (err, nameData) => {
    if (err) return cb(err);
    console.log(nameData);
    cb(null, nameData.rows[0]['first_name']);
  })
}

module.exports = getUserName;