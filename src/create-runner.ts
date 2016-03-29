import * as path from 'path';
const child = require('child_process');

export default function createRunner(config: CR.Config, testFile: string) {

  let report = path.join(__dirname, '..', '_report.json');

  return child.exec([
    'py.test',
    `--json=${report}`,
    '-x', // stop after first failure
    testFile
  ].join(' '), (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
}
