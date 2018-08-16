const tape = require('tape');
const supertest = require('supertest');

const dbBuild = require('../src/database/db_build');
const router = require('../src/router');
const getBookings = require('../src/queries/getBookings');
const getAvailability = require('../src/queries/getAvailability');
const createBooking = require('../src/queries/createBooking');

//build test database
dbBuild((err, res)=>{
  tape('test db built for queries tests', (t) => {
    t.equals(err, null, 'no error building db');
    t.end();
  });

  tape('test that no error when making database', (t) => {
    const start = '2018-08-21';
    const end = '2018-08-22';
    getBookings(start, end, (err, data) => {
      t.equals(err, null, "error is not triggered when getting data");
      t.equals(data.length, 3, "function returns 3 rows of data");
      t.end();
    })
});

  // tape('test getBookings can handle errors', (t) => {
  //     const start = 'BEAGLE';
  //     const end = 'FOX TERRIER';
  //     getBookings(start, end, (err, data) => {
  //       console.log(err);
  //     })
  //     t.end();
  // })

  tape('test createBooking function', (t) => {
      createBooking(3 , '2018-08-11T14:46:57.417Z', '2018-08-11T15:47:55.129Z', true, (err, data) => {
        t.equals(err, null, "error is not triggered when creating booking");
        t.equals(data.command, 'INSERT', "this will be INSERTed");
        t.equals(data.rowCount, 1, "one row added");
        t.end();
      })
  });

  // tape('check createBooking handles errors', (t) => {
  //     createBooking('Dave', 'SNOOPY', 'MUTTLEY', true, (err, data) => {
  //       t.equals(err === null, false, "callback is run on error when timestamps are invalid");
  //     })
  //     t.end();
  // });

  tape('test getAvailability', (t) => {
      getAvailability((err, data) => {
        t.equals(err, null, 'no error retrieving availability data');
        t.end();
      })
  })

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
    .get('/get-bookings?start=2018-08-010T10:00&end=2018-08-10T18:00')
    .expect(200)
    .expect('content-type', /json/)
    .end((err,res) => {
      t.error(err, 'supertests');
      t.equals(res.statusCode, 200, 'Should return 200 for get-booking route');
      t.end();
    });
  });

})
