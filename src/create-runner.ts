const child = require('child_process');

export default function createRunner(config: CR.Config, testFile: string) {

  let python = '/usr/local/bin/python';

  return child.exec([
    python,
    '-m pytest',
    '--tap-stream',
    '-x', // stop after first failure
    '--tb=no', // no traceback
    testFile
  ].join(' '));
}
