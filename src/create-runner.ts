import * as path from 'path';
import './loaders';
const spawn = require('child_process').spawn;

// get absolute path to node exec
let node = null;
if (process.platform === 'darwin' && process.resourcesPath) {
  node = path.resolve(process.resourcesPath, '..', 'Frameworks', 'Atom Helper.app', 'Contents', 'MacOS', 'Atom Helper');
} else if (process.platform.match(/win/)) {
  node = 'node';
} else {
  node = process.execPath;
}

export function createRunner(config: CR.Config, testFile: string) {
  // node electron setup
  let options: any = {
    cwd: config.dir
  };
  if (options.env == null) {
    options.env = Object.create(process.env);
  }
  options.env.ATOM_SHELL_INTERNAL_RUN_AS_NODE = 1;
  options.env.DIR = config.dir;
  options.env.TUTORIAL_DIR = config.tutorialDir;
  options.env.TASK_POSITION = config.taskPosition;

  // spawn child process calling test runner
  return spawn(node, [
    'py.test',
    '--json=report.json',
    path.join(__dirname, 'loaders'),
    testFile
  ], options);
}
