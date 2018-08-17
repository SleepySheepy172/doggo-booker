const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const getAvailability = require('./queries/getAvailability');
const getBookings = require('./queries/getBookings');
const createBooking = require('./queries/createBooking');
const register = require('./queries/register');
const verifyLogin = require('./queries/login');
const getUserName = require('./queries/getUserName');

const key = 'jaffa-cakes';

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
  if (req.headers.cookie && req.headers.cookie.includes('status')) {
    const cookies = cookie.parse(req.headers.cookie);
    jwt.verify(cookies.status, key, (err, decoded) => {
      console.log(decoded);
      getAvailability((err, data) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/plain' });
          res.end('Error with request');
        } else {
          getUserName(decoded.user_id, (err, name) => {
            if (err) console.log(err);
            console.log('hi ', name);
            const returnObj = {
              username: name,
              user_id: decoded.user_id,
              logged_in: decoded.logged_in,
              days: data,
            }
            res.writeHead(200, { 'content-type': 'application/json' });
            return res.end(JSON.stringify(returnObj));
          })
        }
      })
    })
  }
  getAvailability((err, data) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('Error with request');
    } else {
      const resultObj = {
        logged_in: false,
        days: data,
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(resultObj));
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
      res.writeHead(200, { 'content-type': 'application/json' });
      try {
        const JSONData = JSON.stringify(data);
        res.end(JSONData)
      }
      catch (err) {
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
      register(parsedData.email, parsedData['first-name'], parsedData['last-name'], parsedData.contact, parsedData.password, (err, id) => {
        if (err) {
          console.log('error', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error updating database with register');
        }
        const payload = { logged_in: true, user_id: id };
        const options = { expiresIn: '30d' };
        const token = jwt.sign(payload, key, options);
        res.writeHead(302, { 'location': '/', 'Set-Cookie': `status=${token}; HttpOnly` });
        return res.end();
      })
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end();
    }
  })
}

const loginRoute = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    // console.log('this is data from loginRoute:', data);
    const parsedData = querystring.parse(data);
    // console.log('this is the parsed login data:', parsedData);
    if (data) {
      verifyLogin(parsedData.email, parsedData.password, (err, id) => {
        if (err) {
          console.log('error', err);
          // REMOVE cookie
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error updating database');
        }
        // MAKE COOKIE !!!
        if (id) {
          const payload = { logged_in: true, user_id: id };
          const options = { expiresIn: '30d' };
          const token = jwt.sign(payload, key, options);
          res.writeHead(302, { 'location': '/', 'Set-Cookie': `status=${token}; HttpOnly` });
          return res.end();
        } else {
          res.writeHead(302, { 'location': '/', 'Set-Cookie': 'status=0; Max-Age=0' });
          return res.end();
        }
      })
    }
  })
}

const logoutRoute = (req, res) => {
  res.writeHead(302, { 'location': '/', 'Set-Cookie': 'status=""; Max-Age=0' });
  res.end();
}

const makeBooking = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    // console.log(data);
    const formData = querystring.parse(data);
    console.log(formData);
    const startTime = formData.date + 'T' + formData['start-time'];
    const endTime = formData.date + 'T' + formData['end-time'];
    if (data) {
      createBooking(formData['user-id'], startTime, endTime, true, (err, data) => {
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



module.exports = { servePublicFile, makeBooking, getAvailabilityRoute, getBookingsRoute, registerRoute, loginRoute, logoutRoute };
