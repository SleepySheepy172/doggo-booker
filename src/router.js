const { servePublicFile, makeBooking } = require('./handler');
const path = require('path');

const router = (req, res) => {
  if (req.url === '/') {
    servePublicFile(res, 'index.html');
  } 
  else if (req.url === '/about') {
    servePublicFile(res, 'about.html');
  } 
  else if (req.url === '/make-booking') {
    makeBooking(req, res);
  }
  else {
    servePublicFile(res, req.url);
  }
};

module.exports = router;
