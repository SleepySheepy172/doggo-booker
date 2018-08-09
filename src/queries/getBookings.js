const dbConnection = require('../database/db_connection');

const getBookings = (start, end, cb) => {
  dbConnection.query('SELECT name, contact, start_time::time, end_time::time FROM bookings WHERE  start_time >= $1 AND end_time <= $2 AND booking = true', [start, end], (err, data) => {
    if (err) return cb(err);
    cb(null, data.rows);
  })
}

module.exports = getBookings;
