const tape = require('tape');
const runDbBuild = require('../src/database/db_build.js');

tape("tape for database is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape('test that no error when making database', (t) => {
  runDbBuild(function (err, res) {
    t.equals(err, null, "error is not triggered");
    t.end();
  });
});


