import createRunner from './create-runner';
import parseTap from './parse-tap';
import logger from './logger';


export default function runner({
  testString, config, handleResult
}): Promise<CR.TestResult> {

  // cleanup .json file
  let runner = createRunner(config, testString);
  let final = null;

  return new Promise(function run(resolve, reject) {
    runner.stdout.on('data', function testData(data): void {

      data = data.toString();

      // no output, end early
      if (!data || !data.length) {
        return;
      }

      // log to Atom console
      logger(data);

      // parse data into JSON object
      final = parseTap(data);

      // could not parse, log error
      if (!final) {
        console.log('Error parsing test ouptut:', data);
      }

      // complete JSON object
      final.change = final.taskPosition - config.taskPosition;
      final.pass = final.change > 0;

      // return result to atom-coderoad
      handleResult(final);
    });

    runner.stderr.on('data', function testError(data) {
      if (data.length) {
        console.log('Test runner error:', data.toString());
      }
    });

    runner.on('end', function testEnd(code: number) {
      if (code === 0) {
        resolve(final);
      } else {
        resolve(final);
      }
    });
  });
}
