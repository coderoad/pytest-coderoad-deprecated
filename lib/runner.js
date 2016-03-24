"use strict";
var path = require('path');
var exists_1 = require('./exists');
var create_runner_1 = require('./create-runner');
var pathToResults = path.resolve(__dirname, '', 'report.json');
function formatFailureMessage(message) {
    return message.split('_').join(' ');
}
function runner(testFile, config, handleResult) {
    var runner = create_runner_1.createRunner(config, testFile);
    var final = null;
    return new Promise(function (resolve, reject) {
        runner.stdout.on('data', function (data) {
            data = data.toString();
            console.log(data);
            if (!exists_1.default(pathToResults)) {
                console.log('error finding test output file: ', data);
                return;
            }
            var result = JSON.parse(require(pathToResults));
            result = result.included[result.included.length - 1].attributes.call;
            if (result.outcome === 'passed') {
                final = {
                    pass: true,
                    msg: 'Task ${0} Complete',
                    taskPosition: 0
                };
            }
            else if (result.outcome === 'failed') {
                final = {
                    pass: false,
                    msg: formatFailureMessage(),
                    taskPosition: 0,
                    timedOut: false
                };
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
