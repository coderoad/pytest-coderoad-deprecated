"use strict";
var path = require('path');
var exists_1 = require('./exists');
var create_runner_1 = require('./create-runner');
var parse_json_1 = require('./parse-json');
var pathToResults = path.resolve(__dirname, '', 'report.json');
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
            final = parse_json_1.parseJson(pathToResults);
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
