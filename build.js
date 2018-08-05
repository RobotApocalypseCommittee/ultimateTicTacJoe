const child_proc = require('child_process');

function runClientNpm(command, cb){
  // Change directory and run build
  const args = [ command ];
  const opts = { stdio: 'inherit', cwd: 'client', shell: true };
  child_proc.spawn('npm', args, opts).on('close', cb);
}

console.log("Build Beginning...");
// Copy shared logic file
const fs = require('fs');

fs.createReadStream('UTTLogic.js').pipe(fs.createWriteStream('client/src/UTTLogic.js'));

// Run client npm install
runClientNpm("install", (code)=>{
  console.log(`Client NPM Install Finished with code ${code}`)
  // Run client build
  runClientNpm("run build", (code)=>console.log(`Build finished with code ${code}`));
});




