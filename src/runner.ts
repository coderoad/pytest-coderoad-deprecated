import * as path from 'path';
import * as fs from 'fs';
import exists from './exists';
import createRunner from './create-runner';
import parseTap from './parse-tap';

export default function runner(testFile: string, config: CR.Config,
  handleResult: (result) => CR.TestResult) {


  // cleanup .json file
  let runner = createRunner(config, testFile);
  var final = null;

  return new Promise((resolve, reject) => {
    runner.stdout.on('data', function(data): void {

      data = data.toString();
      // console.log('DATA', data);

      // transform data;
      final = parseTap(data);
      final.change = final.taskPosition - config.taskPosition;
      final.pass = final.change > 0;

      // return result to atom-coderoad
      handleResult(final);

    });

    runner.stderr.on('data', function(data) {
      console.log('test error', data.toString());
    });

    runner.on('close', function(code: number) {
      if (code === 0) {
        resolve(final);
      } else {
        resolve(final);
      }
    });
  });
}
