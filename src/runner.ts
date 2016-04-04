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
      if (!data || !data.length) {
        return;
      }

      console.log('data', data);
      // console.log
      // console.dir

      // transform data;
      final = parseTap(data);
      if (!final) {
        console.log('Error parsing test ouptut:', data);
      }

      final.change = final.taskPosition - config.taskPosition;
      final.pass = final.change > 0;

      // return result to atom-coderoad
      handleResult(final);

    });

    runner.stderr.on('data', function(data) {
      if (data.length) {
        console.log('Test runner error:', data.toString());
      }
    });

    runner.on('end', function(code: number) {
      if (code === 0) {
        resolve(final);
      } else {
        resolve(final);
      }
    });
  });
}
