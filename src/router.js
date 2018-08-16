const { servePublicFile, makeBooking, getAvailabilityRoute, getBookingsRoute, registerRoute } = require('./handler');
const path = require('path');

const router = (req, res) => {
  console.log('url:', req.url);
  if (req.url === '/') {
    servePublicFile(res, 'index.html');
  }
  else if (req.url === '/about') {
    servePublicFile(res, 'about.html');
  }
  else if (req.url === '/get-availability') {
    getAvailabilityRoute(req, res);
  }
  else if (req.url.startsWith('/get-bookings')) {
    getBookingsRoute(req, res);
  }
  else if (req.url === '/make-booking') {
    makeBooking(req, res);
  } else if (req.url === '/register') {
    registerRoute(req, res);
  }
  else {
    servePublicFile(res, req.url);
  }
};

module.exports = router;
