import createRunner from './create-runner';
import parseTap from './parse-tap';
import logger from './logger';


export default function runner(testFile: string, config: CR.Config,
  handleResult: (result) => CR.TestResult): Promise<CR.TestResult> {

  // cleanup .json file
  let runner = createRunner(config, testFile);
  var final = null;

  return new Promise((resolve, reject) => {
    runner.stdout.on('data', function(data): void {

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
