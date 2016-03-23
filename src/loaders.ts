import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';

function loadEditor(pathToContext: string): void {
  let absPath = path.join(process.env.DIR, getCrossPlatformPath(pathToContext));
  let context = fs.readFileSync(absPath, 'utf8');
  vm.runInThisContext(context);
}

function loadGlobal(name: string, pathToData: string): void {
  pathToData = path.join(process.env.TUTORIAL_DIR, getCrossPlatformPath(pathToData));
  global[name] = require(pathToData);
}

function getCrossPlatformPath(pathTo: string): string {
  pathTo = path.normalize(pathTo);
  if (process.platform.match(/win/)) {
    pathTo = pathTo.replace(/\\/g, '/');
  }
  return pathTo;
}

global.loadEditor = loadEditor;
global.loadGlobal = loadGlobal;
