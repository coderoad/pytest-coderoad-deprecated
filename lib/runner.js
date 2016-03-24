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
            if (!result.report || !result.report.tests.length) {
                console.log('error with test output in report.json');
                return;
            }
            var finalTest = result.report.tests[0];
            var taskPosition = parseInt(finalTest.name.match(/::Test([0-9]+)/)[1], 10);
            if (!taskPosition) {
                console.log('Error with test. There is no valid task number in the Test class title');
                return;
            }
            if (finalTest.outcome === 'passed') {
                final = {
                    completed: true,
                    msg: 'Task ${taskPosition} Complete',
                    taskPosition: taskPosition + 1
                };
            }
            else if (finalTest.outcome === 'failed') {
                var message = finalTest.name.match(/::test_(.+)$/)[1];
                if (!message) {
                    console.log('Error with test. There is no valid test message');
                    message = '';
                }
                final = {
                    completed: false,
                    msg: formatFailureMessage(message),
                    taskPosition: taskPosition,
                    timedOut: false
                };
            }
            else {
                console.log('error processing result: ', result);
            }
            final.change = final.taskPosition - config.taskPosition;
            final.pass = final.change > 0;
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
