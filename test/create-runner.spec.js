import test from 'ava';
import * as path from 'path';
import {getCreateRunner} from './runner-setup';

test('creates a test runner', t => {
  let testFile = path.join(__dirname, 'demos', 'single-test.py');
  let createRunner = getCreateRunner(testFile);
  t.ok(createRunner);
});
