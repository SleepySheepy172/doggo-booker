const dbConnection = require('../database/db_connection');
const bcrypt = require('bcrypt');

const verifyLogin = (email, password, cb) => {
  // ask db for hashed password (to match with the input) and email (to use unique info)
  dbConnection.query('SELECT password FROM users WHERE email=$1;', [email], (err,hashedPassword) => {
    console.log('hashedPassword:', hashedPassword.rows[0]['password'])
    bcrypt.compare(password, hashedPassword.rows[0]['password'], (err,data)=> {
    console.log('data in verifyLogin:', data)
    if (err) return cb(err);
    // console.log('this is the hashed password:', data.rows.password)
    cb(null, data);
  })
})

}



module.exports = verifyLogin;
