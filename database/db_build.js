// read .sql file
const fs = require('fs');
const dbConnection = require('./db_connection');

// and convert in into a string
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

// and use a method from pg that can run sql files
dbConnection.query(sql, (err, res) => {
  // can catch duplicate inputs
  if (err) throw err;
  console.log('table created ', res);
});
