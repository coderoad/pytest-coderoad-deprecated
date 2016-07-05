"use strict";
var regex = {
    isTap: /^# TAP results/m,
    test: /^[not ]?ok [0-9]+ -/m,
    finalTest: /^1..([0-9+])$/m,
    error: /^# E\s+(.+)$/m,
};
function formatFeedback(message) {
    return message.split('_').join(' ');
}
function parseTap(data) {
    if (!data || !data.match(regex.isTap)) {
        console.log('No TAP output: ', data);
        return;
    }
    if (!data.match(regex.finalTest)) {
        console.log('Could not parse final test number: ', data);
        return;
    }
    var finalTest = parseInt(data.match(regex.finalTest)[1], 10);
    var final = null;
    if (data.match(regex.error)) {
        var failingLineRegex = new RegExp("^not ok " + finalTest + " - (.+)$", 'm');
        var line = data.match(failingLineRegex)[1];
        if (!line || typeof line !== 'string') {
            console.log('Error matching failing test line: ', data);
        }
        var taskPosition = parseInt(line.match(/Test([0-9]+)/)[1], 10);
        if (!taskPosition || typeof taskPosition !== 'number') {
            console.log('No matching taskPosition', data);
        }
        var message = formatFeedback(line.match(/\.test_(.+)$/)[1]);
        if (!message || typeof message !== 'string') {
            console.log('Error with test. There is no valid test message: ', data);
            message = '';
        }
        final = {
            completed: false,
            msg: formatFeedback(message),
            taskPosition: taskPosition - 1,
            timedOut: false,
        };
    }
    else {
        var finalPassRegex = new RegExp("^ok " + finalTest + " - (.+)$", 'm');
        var line = data.match(finalPassRegex)[1];
        var taskPosition = parseInt(line.match(/Test([0-9]+)/)[1], 10);
        final = {
            completed: true,
            msg: "Task " + taskPosition + " Complete",
            taskPosition: taskPosition,
        };
    }
    return final;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseTap;
