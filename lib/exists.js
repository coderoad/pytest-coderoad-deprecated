"use strict";
var fs_1 = require('fs');
function fileExists(path) {
    try {
        fs_1.accessSync(path, fs_1.F_OK);
    }
    catch (e) {
        if (e) {
            if (e.code !== 'ENOENT') {
                console.log(e);
            }
            return false;
        }
    }
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileExists;
