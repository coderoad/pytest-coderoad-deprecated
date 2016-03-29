"use strict";
var final = null;
var testNumber = /::Test([0-9]+)/;
var testMessage = /::test_(.+)$/;
function formatFailureMessage(message) {
    return message.split('_').join(' ');
}
function parseJson(pathToResults) {
    var result = JSON.parse(JSON.stringify(require(pathToResults)));
    if (!result.report || !result.report.tests.length || !result.report.summary) {
        console.log('error with test output in report.json');
        return;
    }
    var finalIndex = result.report.summary.num_tests - 1;
    var finalTest = result.report.tests.find(function (test) {
        return test.run_index === finalIndex;
    });
    var taskPosition = parseInt(finalTest.name.match(testNumber)[1], 10);
    if (!taskPosition) {
        console.log('Error with test. There is no valid task number in the Test class title');
        return;
    }
    var failed = result.report.summary.failed > 0;
    if (!failed) {
        final = {
            completed: true,
            msg: "Task " + taskPosition + " Complete",
            taskPosition: taskPosition
        };
    }
    else {
        var message = finalTest.name.match(testMessage)[1];
        if (!message) {
            console.log('Error with test. There is no valid test message');
            message = '';
        }
        final = {
            completed: false,
            msg: formatFailureMessage(message),
            taskPosition: taskPosition - 1,
            timedOut: false
        };
    }
    return final;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseJson;
