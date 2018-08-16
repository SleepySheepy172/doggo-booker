const dbConnection = require('../database/db_connection');

const getBookings = (start, end, cb) => {
  dbConnection.query('SELECT users.first_name, users.last_name, bookings.start_time::time, bookings.end_time::time FROM bookings INNER JOIN users ON bookings.user_id = users.id WHERE bookings.start_time >= $1 AND bookings.end_time <= $2 AND bookings.booking = true ORDER BY bookings.start_time ASC;', [start, end], (err, data) => {
    if (err) return cb(err);
    console.log('this is data.rows', data.rows)
    cb(null, data.rows);
  })
}

module.exports = getBookings;
