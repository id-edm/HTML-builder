const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const sourceFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) {
        throw err;
      }
});
fs.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
        throw err;
      }
    async function copyFiles(files, copyAllFilles) {
        await copyAllFilles.forEach((file) => {
            const copyFile = path.join(__dirname, 'files-copy', file);
            fsPromises.unlink(copyFile);
        });
        await files.forEach((file) => {
            const sourceFile = path.join(__dirname, 'files', file.name);
            const copyFile = path.join(__dirname, 'files-copy', file.name);
            fsPromises.copyFile(sourceFile, copyFile);
        });
    }
    fs.readdir(copyFolder, (err, copyAllFilles) => {
        if (err) if (err) {
            throw err;
          }
          
        copyFiles(files, copyAllFilles);
    });
});