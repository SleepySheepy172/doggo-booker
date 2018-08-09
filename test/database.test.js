const tape = require('tape');
const runDbBuild = require('../src/database/db_build.js');
const getBookings = require('../src/queries/getBookings');
const createBooking = require('../src/queries/createBooking');

tape("tape for database is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape('test that no error when making database', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is not triggered");
    getBookings((err, data) => {
      t.equals(err, null, "error is not triggered when getting data");
      t.equals(data.length, 3, "function returns 3 rows of data");
    })
    t.end();
  });
});

tape('test that no error when making database', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is not triggered");
    createBooking('Martin', '07346598732', '2018-11-08T14:46:57.417Z', '2018-11-08T15:47:55.129Z', (err, data) => {
      t.equals(err, null, "error is not triggered when creating booking");
      t.equals(data.command, 'INSERT', "this will be INSERTed");
      t.equals(data.rowCount, 1, "one row added");
    })
    t.end();
  });
});
