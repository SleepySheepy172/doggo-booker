// CREATE BOOKING
const dbConnection = require('../database/db_connection');

const createBooking = (name, contact, start, end, booking, cb) => {
  dbConnection.query('INSERT INTO bookings (name, contact, start_time, end_time, booking) VALUES ($1, $2, $3, $4, $5)',
    [name, contact, start, end, booking],
    (err, data) => {
      if (err) return cb(err);
      cb(null, data);
    })
}

module.exports = createBooking;
