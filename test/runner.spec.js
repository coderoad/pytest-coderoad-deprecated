import test from 'ava';
import * as path from 'path';
import * as fs from 'fs';
import exists from '../lib/exists';
import {getRunner} from './runner-setup';

test.beforeEach(t => {
  let file = path.resolve(__dirname, '..', '_report.json');
  if (exists(file)) {
    fs.unlink(file);
  }
});

test('runner runs a single test to completion', async t => {
  let file = path.join(__dirname, 'demos', 'single-test.py');
  let run = await getRunner(file);
  let expected = {
    change: 1,
    pass: true,
    taskPosition: 1,
    msg: 'Task 1 Complete',
    completed: true
  };
  t.same(run, expected);
});

test('runner runs three tests to completion', async t => {
    let file = path.join(__dirname, 'demos', 'pass-three.py');
    let run = await getRunner(file);
    let expected = {
      change: 3,
      pass: true,
      taskPosition: 3,
      msg: 'Task 3 Complete',
      completed: true
    };
    t.same(run, expected);
});

test.todo('runner fails early at first failure');
test.todo('runner fails at final test');
