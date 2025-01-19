const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'secret-folder');

fs.readdir(route, (err, files) => {
  if (err) {
    throw err;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(route, file);

    fs.stat(filePath, (err, stat) => {
      if (err) {
        throw err;
      }

      if (stat.isFile()) {
        const arr = file.split('.');
        const arrLastIndex = arr.length - 1;
        const fileName = arr.slice(0, arrLastIndex ).join('');
        const extensionName = path.extname(file).split('.').join('');
        const sizeFile = `${(stat.size / 1024).toFixed(3)}kb`

        console.log(fileName, '-', extensionName, '-', sizeFile);
      }
    });
  }
});
