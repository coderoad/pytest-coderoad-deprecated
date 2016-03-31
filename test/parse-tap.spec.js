import test from 'ava';
import parseTap from '../lib/parse-tap';

test('will pass all', t => {
  const tap = `
# TAP results for Test01Class
ok 1 - Test01Class.test_passing_one
ok 2 - Test01Class.test_passing_test
# TAP results for Test02Class
ok 3 - Test02Class.test_passing_two
ok 4 - Test02Class.test_passing_test
# TAP results for Test03Class
ok 5 - Test03Class.test_passing_three
ok 6 - Test03Class.test_passing_test
1..6
`;
  const result = parseTap(tap);

  const expected = {
    completed: true,
    msg: 'Task 3 Complete',
    taskPosition: 3
  };
  t.same(result, expected);
});

test('will fail on first', t => {
  const tap = `
# TAP results for Test01Class
ok 1 - Test01Class.test_passing_one
not ok 2 - Test01Class.test_failing_test
# E   assert 1 > 2
1..2
`;
  const result = parseTap(tap);

  const expected = {
    completed: false,
    msg: 'failing test',
    taskPosition: 0,
    timedOut: false
  };
  t.same(result, expected);
});

test('will fail on third', t => {
  const tap = `
# TAP results for Test01Class
ok 1 - Test01Class.test_passing_one
ok 2 - Test01Class.test_passing_test
# TAP results for Test02Class
ok 3 - Test02Class.test_passing_two
ok 4 - Test02Class.test_passing_test
# TAP results for Test03Class
ok 5 - Test03Class.test_passing_three
not ok 6 - Test03Class.test_failing_test
# E   assert 1 > 2
1..6
`;
  const result = parseTap(tap);

  const expected = {
    completed: false,
    msg: 'failing test',
    taskPosition: 2,
    timedOut: false
  };
  t.same(result, expected);
});
