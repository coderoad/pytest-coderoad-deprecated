// import test from 'ava';
// import * as path from 'path';
// import * as fs from 'fs';
// import exists from '../lib/exists';
// import {getRunner} from './runner-setup';
//
// // test('runner runs a single test to completion', async t => {
// //   let file = path.join(__dirname, 'demos', 'single-test.py');
// //   let run = await getRunner(file);
// //   let expected = {
// //     change: 1,
// //     pass: true,
// //     taskPosition: 1,
// //     msg: 'Task 1 Complete',
// //     completed: true
// //   };
// //   t.same(run, expected);
// // });
//
// // test('runner runs three tests to completion', async t => {
// //     let file = path.join(__dirname, 'demos', 'pass-three.py');
// //     let run = await getRunner(file);
// //     let expected = {
// //       change: 3,
// //       pass: true,
// //       taskPosition: 3,
// //       msg: 'Task 3 Complete',
// //       completed: true
// //     };
// //     t.same(run, expected);
// // });
//
// // test('runner fails early at first failure', async t => {
// //   let file = path.join(__dirname, 'demos', 'fail-at-one.py');
// //   let run = await getRunner(file);
// //   let expected = {
// //     change: 0,
// //     pass: false,
// //     taskPosition: 0,
// //     msg: 'failing test',
// //     completed: false,
// //     timedOut: false
// //   };
// //   t.same(run, expected);
// // });
// // //
// // test('runner fails at final test', async t => {
// //       let file = path.join(__dirname, 'demos', 'fail-at-three.py');
// //       let run = await getRunner(file);
// //       let expected = {
// //         change: 2,
// //         pass: true,
// //         taskPosition: 2,
// //         msg: 'failing test',
// //         completed: false,
// //         timedOut: false
// //       };
// //       t.same(run, expected);
// // });
