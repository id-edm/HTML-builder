const fs = require('fs');
const path = require('path');
const readline = require('readline');
const route = path.join(__dirname, '02-write-file.txt');

fs.writeFile(route, '', (err) => {
	if (err) {
		throw err;
	}
});

const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
console.log('Enter text:');

rl.on('line', (input) => {
	if (input) {
		if (input.toLowerCase().trim() === 'exit') {
			console.log('Text entry complete!');
			process.exit();
		} else {
			fs.appendFile(route, `${input}\n`, (err) => {
				if (err) {
					console.error(`Error adding to file: ${err}`);
				}
			});
		}
	}
});

rl.on('close', () => {
	console.log('Text entry complete!');
});
