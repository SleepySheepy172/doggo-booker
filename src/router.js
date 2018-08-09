const { servePublicFile, makeBooking } = require('./handler');
const path = require('path');

const router = (req, res) => {
  if (req.url === '/') {
    servePublicFile(res, 'index.html');
  } 
  if (req.url === '/about') {
    servePublicFile(res, 'about.html');
  } 
  if (req.url === '/make-booking') {
    makeBooking(req, res);
  }
  else {
    servePublicFile(res, req.url);
  }
};

module.exports = router;
