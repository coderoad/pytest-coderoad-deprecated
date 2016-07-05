"use strict";
var create_runner_1 = require('./create-runner');
var parse_tap_1 = require('./parse-tap');
var logger_1 = require('./logger');
function runner(_a) {
    var testString = _a.testString, config = _a.config, handleResult = _a.handleResult;
    var runner = create_runner_1.default(config, testString);
    var final = null;
    return new Promise(function run(resolve, reject) {
        runner.stdout.on('data', function testData(data) {
            data = data.toString();
            if (!data || !data.length) {
                return;
            }
            logger_1.default(data);
            final = parse_tap_1.default(data);
            if (!final) {
                console.log('Error parsing test ouptut:', data);
            }
            final.change = final.taskPosition - config.taskPosition;
            final.pass = final.change > 0;
            handleResult(final);
        });
        runner.stderr.on('data', function testError(data) {
            if (data.length) {
                console.log('Test runner error:', data.toString());
            }
        });
        runner.on('end', function testEnd(code) {
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
