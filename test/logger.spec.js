import test from 'ava';
import * as path from 'path';
import {
	getCreateRunner
} from './runner-setup';

test('should log to the console', t => {
	let testFile = path.join(__dirname, 'demos', 'pass-log.py');
	let createRunner = getCreateRunner(testFile);
	t.ok(createRunner);
});