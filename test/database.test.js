const tape = require('tape');
const runDbBuild = require('../src/database/db_build.js');
const getBookings = require('../src/queries/getBookings');
const createBooking = require('../src/queries/createBooking');
const getAvailability = require('../src/queries/getAvailability');

tape("tape for database is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape('test that no error when making database', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is not triggered");
    const start = '2018-08-10';
    const end = '2018-08-11';
    getBookings(start, end, (err, data) => {
      t.equals(err, null, "error is not triggered when getting data");
      t.equals(data.length, 3, "function returns 3 rows of data");
    })
    t.end();
  });
});

tape('test getBookings can handle errors', (t) => {
  runDbBuild((err, buildData) => {
    t.equals(err, null, 'database was built');
    const start = 'BEAGLE';
    const end = 'FOX TERRIER';
    getBookings(start, end, (err, data) => {
      t.equals(err === null, false, "callback handles error when times are invalid");
    })
    t.end();
  })
})

tape('test createBooking function', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is not triggered");
    createBooking('Martin', '07346598732', '2018-08-11T14:46:57.417Z', '2018-08-11T15:47:55.129Z', true, (err, data) => {
      t.equals(err, null, "error is not triggered when creating booking");
      t.equals(data.command, 'INSERT', "this will be INSERTed");
      t.equals(data.rowCount, 1, "one row added");
    })
    t.end();
  });
});

tape('check createBooking handles errors', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is not triggered");
    createBooking('Dave', '07346598732', 'SNOOPY', 'MUTTLEY', true, (err, data) => {
      t.equals(err === null, false, "callback is run on error when timestamps are invalid");
    })
    t.end();
  });
});

tape('test getAvailability', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is null");
    getAvailability((err, data) => {
      t.equals(err, null, 'no error retrieving availability data');
    })
    t.end();
  })
})
