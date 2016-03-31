"use strict";
var child = require('child_process');
function createRunner(config, testFile) {
    var python = '/usr/local/bin/python';
    return child.exec([
        python,
        '-m pytest',
        '--tap-stream',
        '-x',
        '--tb=no',
        testFile
    ].join(' '), function (error, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        if (error !== null) {
            console.log("exec error: " + error);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRunner;
