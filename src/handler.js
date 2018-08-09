const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const getAvailability = require('./queries/getAvailability');
const getBookings = require('./queries/getBookings');

const servePublicFile = (res, filename) => {
  fs.readFile(path.join(__dirname, '..', 'public', filename), (err, file) => {
    const fileType = path.extname(filename);
    const mimeType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.ico': 'image/x-icon',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
    };
    // if there is an error reading the file...
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      // else...
    } else {
      res.writeHead(200, { 'Content-Type': mimeType[fileType] });
      res.end(file);
    }
  });
};

const getAvailabilityRoute = (req, res) => {
  getAvailability((err, data) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('Error with request');
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(data));
    }
  })
}

const getBookingsRoute = (req, res) => {
  const query = req.url.split('?')[1];
  const parsedQuery = querystring.parse(query);
  getBookings(parsedQuery.start, parsedQuery.end, (err, data) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('Error with request');
    } else {
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(JSON.stringify(data));
    }
  })
}

const makeBooking = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end();
}



module.exports = { servePublicFile, makeBooking, getAvailabilityRoute, getBookingsRoute };
