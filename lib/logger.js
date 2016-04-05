"use strict";
var unexpectedOutput = /^(?!# TAP)(?!(not )?ok [0-9]+ -)(?!1..[0-9]+)(?!# E\s)(.*)$/gm;
function logger(data) {
    var logs = data.match(unexpectedOutput);
    if (!logs && logs.length < 1) {
        return;
    }
    logs.forEach(function (line) {
        if (line.length > 0) {
            try {
                line = JSON.parse(JSON.stringify(line));
                console.dir(JSON.parse(JSON.stringify(line)));
            }
            catch (e) {
                console.log(line);
            }
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
