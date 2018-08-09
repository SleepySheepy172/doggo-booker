// read .sql file
const fs = require('fs');
const dbConnection = require('./db_connection');

// and convert in into a string
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const runDbBuild = cb => {
  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

module.exports = runDbBuild;
