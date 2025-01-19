const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  readStream.close();
});

readStream.on('error', (err) => {
  console.error(`An error occurred while reading the file: ${err.message}`);
});
