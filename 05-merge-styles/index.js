const fs = require('fs');
const path = require('path');
const stylesPath = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(bundleFolder, 'bundle.css');

fs.readdir(stylesPath, (err, files) => {
  if (err) {console.error(err);
    return;
  }

  fs.open(bundleFile, 'a', (err) => {
    if (err) {console.error(err);
      return;
    }
  });

  fs.writeFile(bundleFile, '', (err) => {
    if (err) {console.error(err);
      return;
    }
  });

  for (let i = 0; i < files.length; i++) {
    fs.readFile( path.join(stylesPath, files[i]),'utf8',
      function (error, content) {
        if (error) {console.error(error);
          return;
        }
        if (path.extname(files[i]) === '.css') {
          fs.appendFile(bundleFile, content, function (error) {
            if (error) {console.error(error);
              return;
            }
          });
        }
      },
    );
  }
});
