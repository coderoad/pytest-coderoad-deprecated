"use strict";
var final = null;
var testNumber = /::Test([0-9]+)/;
var testMessage = /::test_(.+)$/;
function formatFailureMessage(message) {
    return message.split('_').join(' ');
}
function parseJson(pathToResults) {
    var result = JSON.parse(require(pathToResults));
    if (!result.report || !result.report.tests.length) {
        console.log('error with test output in report.json');
        return;
    }
    var finalTest = result.report.tests[0];
    var taskPosition = parseInt(finalTest.name.match(testNumber)[1], 10);
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
        var message = finalTest.name.match(testMessage)[1];
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
    return final;
}
exports.parseJson = parseJson;
