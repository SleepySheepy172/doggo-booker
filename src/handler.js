const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const getAvailability = require('./queries/getAvailability');
const getBookings = require('./queries/getBookings');
const createBooking = require('./queries/createBooking');
const register = require('./queries/register');


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
      '.ttf': 'application/x-font-truetype',
      '.otf': 'application/x-font-opentype'
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
};

const getBookingsRoute = (req, res) => {
  const query = req.url.split('?')[1];
  const parsedQuery = querystring.parse(query);
  getBookings(parsedQuery.start, parsedQuery.end, (err, data) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('Error with request');
    } else {
      res.writeHead(200, {'content-type': 'application/json'});
      try {
        const JSONData = JSON.stringify(data);
        res.end(JSONData)
      }
      catch(err) {
        res.end("[]");
      }
    }
  })
}

const registerRoute = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    const parsedData = querystring.parse(data);
    console.log(parsedData);
    if (data) {
      register(parsedData.email, parsedData['first-name'], parsedData['last-name'], parsedData.contact, parsedData.password, (err, data) => {
        if (err) {
          console.log('error', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error updating database with register');
        }
        res.writeHead(302, { 'Content-Type': 'location', 'Location': '/' });
        return res.end('Success registering');
      })
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end();
    }
  })
}
const makeBooking = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    console.log(data);
    const formData = querystring.parse(data);
    const startTime = formData.date + 'T' + formData['start-time'];
    const endTime = formData.date + 'T' + formData['end-time'];
    if (data) {
      createBooking(formData.name, formData.contact, startTime, endTime, true, (err, data) => {
        if (err) {
          console.log('error', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error updating database');
        }
        res.writeHead(302, { 'Content-Type': 'location', 'Location': '/' });
        return res.end('Success');
      })
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end();
    }
  })
}



module.exports = { servePublicFile, makeBooking, getAvailabilityRoute, getBookingsRoute, registerRoute };
