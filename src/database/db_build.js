// read .sql file
const fs = require('fs');
const dbConnection = require('./db_connection');

// and convert in into a string
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const runDbBuild = cb => {
  dbConnection.query(sql, (err, res) => {
    console.log('this is res', err)
    if (err) return cb(err);
    cb(null, res);
  });
};

module.exports = runDbBuild;
