"use strict";
var vm = require('vm');
var fs = require('fs');
var path = require('path');
function loadEditor(pathToContext) {
    var absPath = path.join(process.env.DIR, getCrossPlatformPath(pathToContext));
    var context = fs.readFileSync(absPath, 'utf8');
    vm.runInThisContext(context);
}
function loadGlobal(name, pathToData) {
    pathToData = path.join(process.env.TUTORIAL_DIR, getCrossPlatformPath(pathToData));
    global[name] = require(pathToData);
}
function getCrossPlatformPath(pathTo) {
    pathTo = path.normalize(pathTo);
    if (process.platform.match(/win/)) {
        pathTo = pathTo.replace(/\\/g, '/');
    }
    return pathTo;
}
global.loadEditor = loadEditor;
global.loadGlobal = loadGlobal;
