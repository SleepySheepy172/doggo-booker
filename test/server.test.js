const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

tape('testing home route', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.equal(res.statusCode, 200, 'Should return 200');
      t.equal(res.text.includes('<html lang="en">') && res.text.includes('</html>'),
        true, 'response includes HTML opening and closing tags');
      t.end();
    });
});

tape('testing 404', (t) => {
  supertest(router)
    .get('/ksjgls')
    .expect(404)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.equal(res.statusCode, 404, 'Should return 404');
      t.end();
    });
});

tape('testing main.css', (t) => {
  supertest(router)
    .get('/css/main.css')
    .expect(200)
    .expect('Content-Type', /css/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.equal(res.statusCode, 200, 'Should return 200');
      t.end();
    });
});
