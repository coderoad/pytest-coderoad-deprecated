"use strict";
var isTap = /^# TAP/m;
var finalTestNumber = /^1..([0-9+])$/m;
var testError = /^# E\s+(.+)$/m;
function formatFailureMessage(message) {
    return message.split('_').join(' ');
}
function parseTap(data) {
    if (!data.match(isTap)) {
        console.log('No TAP output: ', data);
        return;
    }
    if (!data.match(finalTestNumber)) {
        console.log('Could not parse final test number: ', data);
        return;
    }
    var finalTest = parseInt(data.match(finalTestNumber)[1], 10);
    var final = null;
    if (data.match(testError)) {
        var failingLineRegex = new RegExp("^not ok " + finalTest + " - (.+)$", 'm');
        var line = data.match(failingLineRegex)[1];
        if (!line) {
            console.log('Error matching failing test line: ', data);
        }
        var taskPosition = parseInt(line.match(/Test([0-9]+)/)[1], 10);
        if (!taskPosition) {
            console.log('No matching taskPosition', data);
        }
        var message = formatFailureMessage(line.match(/\.test_(.+)$/)[1]);
        if (!message) {
            console.log('Error with test. There is no valid test message: ', data);
            message = '';
        }
        final = {
            completed: false,
            msg: formatFailureMessage(message),
            taskPosition: taskPosition - 1,
            timedOut: false
        };
    }
    else {
        var finalPassRegex = new RegExp("^ok " + finalTest + " - (.+)$", 'm');
        var line = data.match(finalPassRegex)[1];
        var taskPosition = parseInt(line.match(/Test([0-9]+)/)[1], 10);
        final = {
            completed: true,
            msg: "Task " + taskPosition + " Complete",
            taskPosition: taskPosition
        };
    }
    return final;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseTap;
