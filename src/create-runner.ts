import exists from './exists';
import {exec} from 'child_process';

let python = 'python';
let localPath = '/usr/local/bin/python';
let globalPath = '/usr/bin/python';

// use python path for mac/linux (usr/local/bin, usr/bin), or windows (python)
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
  // see pytest options: https://pytest.org/latest/usage.html
  return exec([
    python,
    '-m pytest',
    '-s', // capture content
    '--tap-stream', // TAP formatted output
    '-x', // stop after first failure
    '--tb=no', // no traceback
    testFile
  ].join(' '));
}
