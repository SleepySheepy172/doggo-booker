// CREATE BOOKING
const dbConnection = require('../database/db_connection');

const createBooking = (user_id, start, end, booking, cb) => {
  dbConnection.query('INSERT INTO bookings (user_id, start_time, end_time, booking) VALUES ($1, $2, $3, $4)',
    [user_id, start, end, booking],
    (err, data) => {
      if (err) return cb(err);
      cb(null, data);
    })
}

module.exports = createBooking;
