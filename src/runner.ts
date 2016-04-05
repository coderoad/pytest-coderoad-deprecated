import createRunner from './create-runner';
import parseTap from './parse-tap';

function log(data: string): void {
  var logs = data.match(/^(?!# TAP)(?!(not )?ok [0-9]+ -)(?!1..[0-9]+)(?!# E\s)(.*)$/gm);
  if (logs && logs.length > 0) {
    logs.forEach((line: string) => {
      if (line.length > 0) {
        try {
          line = JSON.parse(JSON.stringify(line));
          if (typeof line === 'string') {
            console.log(line);
          } else {
            console.dir(JSON.parse(JSON.stringify(line)));
          }
        } catch (e) {
          console.log(line);
        }
      }
    });
  }
}

export default function runner(testFile: string, config: CR.Config,
  handleResult: (result) => CR.TestResult): Promise<CR.TestResult> {

  // cleanup .json file
  let runner = createRunner(config, testFile);
  var final = null;

  return new Promise((resolve, reject) => {
    runner.stdout.on('data', function(data): void {

      data = data.toString();
      if (!data || !data.length) {
        return;
      }

      // capture any abnormal data as a log
      log(data);

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
