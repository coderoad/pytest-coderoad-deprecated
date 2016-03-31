"use strict";
var child = require('child_process');
function createRunner(config, testFile) {
    return child.exec([
        'python -m pytest',
        '--cache-clear',
        '-x',
        '--tb=no',
        '--tap-stream',
        testFile
    ].join(' '), function (error, stdout, stderr) {
        if (error !== null) {
            console.log("exec error: " + error);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRunner;
