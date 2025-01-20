const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(bundleFolder, 'bundle.css');

fs.readdir(stylesPath, (err, files) => {
	if (err) {
		console.error(err);
		return;
	}

	fs.writeFile(bundleFile, '', (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		fs.readFile(path.join(stylesPath, file), 'utf8',
			function (err, content) {
				if (err) {
					console.error(err);
					return;
				}
				if (path.extname(file) === '.css') {
					fs.appendFile(bundleFile, content, function (err) {
						if (err) {
							console.error(err);
							return;
						}
					});
				}
			},
		);
	}
});
