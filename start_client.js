// Copy shared logic file
const fs = require('fs');

fs.createReadStream('UTTLogic.js').pipe(fs.createWriteStream('client/src/UTTLogic.js'));

// Change directory and run start
const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);