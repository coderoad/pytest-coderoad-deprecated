const child = require('child_process');

export default function createRunner(config: CR.Config, testFile: string) {

  return child.exec([
    'python -m pytest',
    '--cache-clear',
    '-x', // stop after first failure
    '--tb=no', // no traceback
    '--tap-stream',
    testFile
  ].join(' '), (error, stdout, stderr) => {
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
}
