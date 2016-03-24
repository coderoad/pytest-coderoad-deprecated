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
      if (!result.report || !result.report.tests.length) {
        console.log('error with test output in report.json');
        return;
      }

      let finalTest = result.report.tests[0];

      let taskPosition: number = parseInt(finalTest.name.match(/::Test([0-9]+)/)[1], 10);
      if (!taskPosition) {
        console.log('Error with test. There is no valid task number in the Test class title');
        return;
      }

      if (finalTest.outcome === 'passed') {
        // pass
        final = {
          completed: true,
          msg: 'Task ${taskPosition} Complete',
          taskPosition: taskPosition + 1
        };
      } else if (finalTest.outcome === 'failed') {
        // fail: return first failure

        // failure message
        let message: string = finalTest.name.match(/::test_(.+)$/)[1];
        if (!message) {
          console.log('Error with test. There is no valid test message');
          message = '';
        }

        final = {
          completed: false,
          msg: formatFailureMessage(message),
          taskPosition,
          timedOut: false // TODO
        };

      } else {
        console.log('error processing result: ', result);
      }

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
