const regex = {
  isTap: /^# TAP/m,
  test: /^[not ]?ok [0-9]+ -/m,
  finalTest: /^1..([0-9+])$/m,
  error: /^# E\s+(.+)$/m,
  log: /^(?!# TAP)(?!(not )?ok [0-9]+ -)(?!1..[0-9]+)(?!# E\s)(.*)$/
};

function formatFeedback(message: string): string {
  return message.split('_').join(' ');
}

function log(data: string): void {
  var logs = data.match(regex.log);
  if (logs && logs.length > 0) {
    logs.forEach((line: string) => {
      try {
        console.dir(JSON.parse(JSON.stringify(line)));
      } catch (e) {
        console.log(data);
      }
    });
  }
}

export default function parseTap(data: string): ParseFinal {

  // capture any abnormal data as a log
  log(data);

  if (!data || !data.match(regex.isTap)) {
    console.log('No TAP output: ', data);
    return;
  }

  if (!data.match(regex.finalTest)) {
    console.log('Could not parse final test number: ', data);
    return;
  }

  let finalTest: number = parseInt(data.match(regex.finalTest)[1], 10);

  let final: ParseFinal = null;

  if (data.match(regex.error)) {

    // first FAILing test

    let failingLineRegex = new RegExp(`^not ok ${finalTest} - (.+)$`, 'm');
    let line: string = data.match(failingLineRegex)[1];
    if (!line || typeof line !== 'string') {
      console.log('Error matching failing test line: ', data);
    }

    let taskPosition: number = parseInt(line.match(/Test([0-9]+)/)[1], 10);
    if (!taskPosition || typeof taskPosition !== 'number') {
      console.log('No matching taskPosition', data);
    }

    let message: string = formatFeedback(line.match(/\.test_(.+)$/)[1]);
    if (!message || typeof message !== 'string') {
      console.log('Error with test. There is no valid test message: ', data);
      message = '';
    }

    final = {
      completed: false,
      msg: formatFeedback(message),
      taskPosition: taskPosition - 1,
      timedOut: false // TODO
    };
  } else {

    // all tests PASS

    let finalPassRegex = new RegExp(`^ok ${finalTest} - (.+)$`, 'm');
    let line: string = data.match(finalPassRegex)[1];
    let taskPosition: number = parseInt(line.match(/Test([0-9]+)/)[1], 10);

    final = {
      completed: true,
      msg: `Task ${taskPosition} Complete`,
      taskPosition
    };
  }

  return final;
}
