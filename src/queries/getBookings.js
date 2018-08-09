const dbConnection = require('../database/db_connection');

const getBookings = (start, end, cb) => {
  dbConnection.query('SELECT * FROM bookings WHERE  start_time >= $1 AND end_time <= $2', [start, end], (err, data) => {
    if (err) return cb(err);
    cb(null, data.rows);
  })
}

module.exports = getBookings;
