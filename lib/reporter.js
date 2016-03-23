"use strict";
var utils_1 = require('./utils');
exports = module.exports = reporter;
function reporter(runner) {
    var result = {
        passes: [],
        failures: [],
        pass: true
    };
    runner.on('pass', function (test) {
        var title = test.fullTitle();
        var obj = getIndexAndTitle(title);
        result.passes.push({
            msg: "Task " + obj.index + " Complete",
            taskPosition: obj.index
        });
    });
    runner.on('fail', function (test, err) {
        var title = test.fullTitle();
        var obj = getIndexAndTitle(title);
        result.failures.push({
            msg: obj.msg,
            taskPosition: obj.index - 1,
            timedOut: test.timedOut
        });
        result.pass = false;
    });
    runner.on('end', function () {
        process.stdout.write(utils_1.signal + JSON.stringify(result, null, 2));
    });
    function getIndexAndTitle(title) {
        var indexString = title.match(/^[0-9]+/);
        if (!indexString) {
            throw 'Tests should begin with a number, indicating the task number';
        }
        return {
            index: parseInt(indexString[0], 10),
            msg: title.slice(indexString[0].length + 1)
        };
    }
}
