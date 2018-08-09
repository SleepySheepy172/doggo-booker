const dbConnection = require('../database/db_connection');

const getBookings = (cb) => {
  dbConnection.query('SELECT * FROM bookings', (err, data) => {
    if (err) return cb(err);
    cb(null, data);
  })
}

module.exports = getBookings;
