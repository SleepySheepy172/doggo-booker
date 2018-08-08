const { servePublicFile } = require('./handler');
const path = require('path');

const router = (req, res) => {
  if (req.url === '/') {
    servePublicFile(res, 'index.html');
  } else {
    servePublicFile(res, req.url);
  }
};

module.exports = router;
