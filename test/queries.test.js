const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

tape('testing get-availability route', (t) => {
  supertest(router)
    .get('/get-availability')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.equal(res.statusCode, 200, 'Should return 200');
      t.end();
    });
});