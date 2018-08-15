const dbConnection = require('../database/db_connection');

const getBookings = (start, end, cb) => {
  dbConnection.query('SELECT start_time::time, end_time::time FROM bookings WHERE start_time >= $1 AND end_time <= $2 AND booking = true', [start, end], (err, data) => {
    if (err) return cb(err);
    console.log('this is data.rows', data.rows)
    cb(null, data.rows);
  })
}

module.exports = getBookings;
