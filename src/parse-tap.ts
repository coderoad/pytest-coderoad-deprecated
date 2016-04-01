const isTap = /^# TAP/m;
const finalTestNumber = /^1..([0-9+])$/m;
const testError = /^# E\s+(.+)$/m;

function formatFailureMessage(message: string): string {
  return message.split('_').join(' ');
}

export default function parseTap(data: string): ParseFinal {

  if (!data || !data.match(isTap)) {
    console.log('No TAP output: ', data);
    return;
  }

  if (!data.match(finalTestNumber)) {
    console.log('Could not parse final test number: ', data);
    return;
  }
  let finalTest: number = parseInt(data.match(finalTestNumber)[1], 10);

  let final: ParseFinal = null;

  if (data.match(testError)) {

    // fail

    let failingLineRegex = new RegExp(`^not ok ${finalTest} - (.+)$`, 'm');
    let line: string = data.match(failingLineRegex)[1];
    if (!line || typeof line !== 'string') {
      console.log('Error matching failing test line: ', data);
    }

    let taskPosition: number = parseInt(line.match(/Test([0-9]+)/)[1], 10);
    if (!taskPosition || typeof taskPosition !== 'number') {
      console.log('No matching taskPosition', data);
    }

    let message: string = formatFailureMessage(line.match(/\.test_(.+)$/)[1]);
    if (!message || typeof message !== 'string') {
      console.log('Error with test. There is no valid test message: ', data);
      message = '';
    }

    final = {
      completed: false,
      msg: formatFailureMessage(message),
      taskPosition: taskPosition - 1,
      timedOut: false // TODO
    };
  } else {

    // all pass

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
