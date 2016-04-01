"use strict";
var exists_1 = require('./exists');
var child_process_1 = require('child_process');
var python = 'python';
var localPath = '/usr/local/bin/python';
var globalPath = '/usr/bin/python';
if (process.platform === 'darwin' && process.resourcesPath) {
    if (exists_1.default(localPath)) {
        python = localPath;
    }
    else if (exists_1.default(globalPath)) {
        python = globalPath;
    }
    else {
        throw 'Python not found. Python may not be installed';
    }
}
function createRunner(config, testFile) {
    return child_process_1.exec([
        python,
        '-m pytest',
        '--tap-stream',
        '-x',
        '--tb=no',
        testFile
    ].join(' '));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRunner;
