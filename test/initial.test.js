const tape = require('tape');

tape('check tape is working', (t) => {
  const expected = 2;
  t.equal(1 + 1, expected, '2 should equal 2');
  t.end();
});