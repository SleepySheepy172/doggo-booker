const fs = require('fs');
const path = require('path');


const servePublicFile = (res, filename) => {
  console.log(filename);
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

module.exports = { servePublicFile };
