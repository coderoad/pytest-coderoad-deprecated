"use strict";
var path = require('path');
var child = require('child_process');
function createRunner(config, testFile) {
    var report = path.join(__dirname, '..', '_report.json');
    return child.exec([
        'py.test',
        ("--json=" + report),
        '-x',
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
