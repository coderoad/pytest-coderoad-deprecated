// import test from 'ava';
// import {
// 	getCreateRunner
// } from './runner-setup';
//
// test('should log to the console', t => {
// 	let testString = `
// a = 1;
//
// class Test01Class:
//     def test_passing_one(self):
//         assert a == 1
//
//     print('Log');
//
//     def test_passing_test(self):
//         assert a < 2
//
// class Test02Class:
//     def test_passing_two(self):
//         assert a == 1
//
//     print('LOG2')
//
//     def test_passing_test(self):
//         assert a < 2
//
// class Test03Class:
//     def test_passing_three(self):
//         print('INNER LOG 3')
//         assert a == 1
//
//     print('LOG3');
//
//     def test_passing_test(self):
//         assert a < 2
// `;
// 	let createRunner = getCreateRunner(testString);
// 	t.ok(createRunner);
// });
