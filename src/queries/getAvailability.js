const dbConnection = require('../database/db_connection');

const getAvailability = (cb) => {
  dbConnection.query('SELECT start_time, end_time FROM bookings WHERE end_time >= now() AND booking = false', (err, data) => {
    if (err) return cb(err);
    cb(null, data.rows);
  })
}
module.exports = getAvailability;