import exists from './exists';
// import * as path from 'path';
import {exec} from 'child_process';

let python = 'python';
let localPath = '/usr/local/bin/python';
let globalPath = '/usr/bin/python';

if (process.platform === 'darwin' && process.resourcesPath) {
  if (exists(localPath)) {
    python = localPath;
  } else if (exists(globalPath)) {
    python = globalPath;
  } else {
    throw 'Python not found. Python may not be installed';
  }
}

export default function createRunner(config: CR.Config, testFile: string) {

  // run concat file: editor & tests
  // if (exists(path.join(__dirname, 'tmp.py'))) {
  //   testFile = path.join(testFile.substring(0, testFile.lastIndexOf('/') || testFile.lastIndexOf('\\')), 'tmp.py');
  // }

  return exec([
    python,
    '-m pytest',
    '--tap-stream',
    '-x', // stop after first failure
    '--tb=no', // no traceback
    testFile
  ].join(' '));
}
