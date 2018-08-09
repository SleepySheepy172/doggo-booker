const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/router');
const dbBuild = require('../src/database/db_build');


dbBuild((err, res)=>{
  tape('test db built for queries tests', (t) => {
    t.equals(err, null, 'no error building db');
    t.end();
  });

  tape('testing get-availability route', (t) => {
    supertest(router)
      .get('/get-availability')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.error(err, 'supertests');
        t.equal(res.statusCode, 200, 'Should return 200 get-availabilty route');
        t.end();
      });
  });

  tape('testing get-bookings route', (t) => {
    supertest(router)
    .get('/get-bookings?start=2018-08-09T10:00&end=2018-08-09T18:00')
    .expect(200)
    .expect('content-type', /json/)
    .end((err,res) => {
      t.error(err, 'supertests');
      t.equals(res.statusCode, 200, 'Should retuen 200 for get-booking route');
      t.end();
    });
  });

})