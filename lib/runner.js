"use strict";
var utils_1 = require('./utils');
var create_runner_1 = require('./create-runner');
function runner(testFile, config, handleResult) {
    var runner = create_runner_1.createRunner(config, testFile);
    var final = null;
    var signalMatch = new RegExp(utils_1.signal);
    return new Promise(function (resolve, reject) {
        runner.stdout.on('data', function (data) {
            data = data.toString();
            console.log(data);
            var match = signalMatch.exec(data);
            if (!match) {
                console.log(data);
                return;
            }
            var resultString = data.substring(match.index + utils_1.signal.length);
            var result = JSON.parse(JSON.stringify(resultString));
            if (typeof result === 'string') {
                result = JSON.parse(result);
            }
            if (result.pass) {
                final = result.passes[result.passes.length - 1];
            }
            else if (result.pass === false) {
                final = result.failures[0];
            }
            else {
                console.log('error processing result: ', result);
            }
            final.change = final.taskPosition - config.taskPosition;
            final.pass = final.change > 0;
            final.completed = result.pass;
            handleResult(final);
        });
        runner.stderr.on('data', function (data) {
            console.log('test error', data.toString());
        });
        runner.on('close', function (code) {
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
