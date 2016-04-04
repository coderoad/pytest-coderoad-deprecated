"use strict";
var create_runner_1 = require('./create-runner');
var parse_tap_1 = require('./parse-tap');
function runner(testFile, config, handleResult) {
    var runner = create_runner_1.default(config, testFile);
    var final = null;
    return new Promise(function (resolve, reject) {
        runner.stdout.on('data', function (data) {
            data = data.toString();
            if (!data || !data.length) {
                return;
            }
            console.log('data', data);
            final = parse_tap_1.default(data);
            if (!final) {
                console.log('Error parsing test ouptut:', data);
            }
            final.change = final.taskPosition - config.taskPosition;
            final.pass = final.change > 0;
            handleResult(final);
        });
        runner.stderr.on('data', function (data) {
            if (data.length) {
                console.log('Test runner error:', data.toString());
            }
        });
        runner.on('end', function (code) {
            if (code === 0) {
                resolve(final);
            }
            else {
                resolve(final);
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runner;
