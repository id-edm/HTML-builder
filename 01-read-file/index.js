const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  readStream.close();
});

readStream.on('error', (err) => {
  console.error(`An error occurred while reading the file: ${err.message}`);
});
