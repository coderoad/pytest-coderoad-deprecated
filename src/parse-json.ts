let final = null;
const testNumber = /::Test([0-9]+)/;
const testMessage = /::test_(.+)$/;

interface ParseFinal {
  complete: boolean;
  msg: string;
  taskPosition: number;
  timedOut?: boolean;
}

function formatFailureMessage(message: string): string {
  return message.split('_').join(' ');
}

export function parseJson(pathToResults: string): ParseFinal {
  let result = JSON.parse(require(pathToResults));
  if (!result.report || !result.report.tests.length) {
    console.log('error with test output in report.json');
    return;
  }

  let finalTest = result.report.tests[0];
  let taskPosition: number = parseInt(finalTest.name.match(testNumber)[1], 10);

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
    let message: string = finalTest.name.match(testMessage)[1];
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

  return final;
}
