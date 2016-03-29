import test from 'ava';
import * as path from 'path';
import {
  parseJson
} from '../lib/parse-json';

test('will pass all', t => {
  let result = parseJson(path.join(__dirname, 'reports', 'pass-three.json'));

  let expected = {
    completed: true,
    msg: 'Task 3 Complete',
    taskPosition: 3
  };
  t.same(result, expected);
});

test('will fail on first', t => {
  let result = parseJson(path.join(__dirname, 'reports', 'fail-at-one.json'));

  let expected = {
    completed: false,
    msg: 'failing test',
    taskPosition: 0,
    timedOut: false
  };
  t.same(result, expected);
});

test('will fail on first', t => {
  let result = parseJson(path.join(__dirname, 'reports', 'fail-at-three.json'));

  let expected = {
    completed: false,
    msg: 'failing test',
    taskPosition: 2,
    timedOut: false
  };
  t.same(result, expected);
});
