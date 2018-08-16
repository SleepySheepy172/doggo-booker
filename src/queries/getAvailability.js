const dbConnection = require('../database/db_connection');

// connction to database and SQL to query database
const getAvailability = (cb) => {
  dbConnection.query('SELECT start_time, end_time FROM bookings WHERE end_time >= now() AND booking = false LIMIT 5', (err, data) => {
    if (err) return cb(err);
    console.log('this is data rows', data.rows)
    cb(null, data.rows);
  })
}

module.exports = getAvailability;
