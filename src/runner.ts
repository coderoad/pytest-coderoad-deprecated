import * as path from 'path';
import exists from './exists';
import {createRunner} from './create-runner';

const pathToResults = path.resolve(__dirname, '', 'report.json');

function formatFailureMessage(message: string) {
  return message.split('_').join(' ');
}

export default function runner(testFile: string, config: CR.Config,
  handleResult: (result) => CR.TestResult) {

  let runner = createRunner(config, testFile);
  var final = null;

  return new Promise((resolve, reject) => {
    runner.stdout.on('data', function(data): void {

      data = data.toString();
      console.log(data);

      /* Result */
      // transform string result into object

      if (!exists(pathToResults)) {
        console.log('error finding test output file: ', data);
        return;
      }

      let result = JSON.parse(require(pathToResults));

      result = result.included[result.included.length - 1].attributes.call;

      if (result.outcome === 'passed') {
        // pass
        final = {
          pass: true,
          msg: 'Task ${0} Complete', // TODO
          taskPosition: 0 // TODO
        };

      } else if (result.outcome === 'failed') {
        // fail: return first failure
        final = {
          pass: false,
          msg: formatFailureMessage(), // TODO
          taskPosition: 0, // TODO
          timedOut: false // TODO
        };

      } else {
        console.log('error processing result: ', result);
      }

      final.change = final.taskPosition - config.taskPosition;
      final.pass = final.change > 0;
      final.completed = result.pass;
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
