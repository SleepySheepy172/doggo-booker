const tape = require('tape');
const runDbBuild = require('../src/database/db_build.js');
const getBookings = require('../src/queries/getBookings');

tape("tape for database is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape('test that no error when making database', (t) => {
  runDbBuild((err, res) => {
    t.equals(err, null, "error is not triggered");
    getBookings((err, data) => {
      t.equals(err, null, "error is not triggered when getting data");
    })
    t.end();
  });
});
