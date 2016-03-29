let final: ParseFinal = null;
const testNumber = /::Test([0-9]+)/;
const testMessage = /::test_(.+)$/;

function formatFailureMessage(message: string): string {
  return message.split('_').join(' ');
}

export default function parseJson(pathToResults: string): ParseFinal {
  let result = JSON.parse(JSON.stringify(require(pathToResults)));
  if (!result.report || !result.report.tests.length || !result.report.summary) {
    console.log('error with test output in report.json');
    return;
  }

  let finalIndex: number = result.report.summary.num_tests - 1;
  let finalTest: PyTest = result.report.tests.find(function(test: PyTest) {
    return test.run_index === finalIndex;
  });
  let taskPosition: number = parseInt(finalTest.name.match(testNumber)[1], 10);

  if (!taskPosition) {
    console.log('Error with test. There is no valid task number in the Test class title');
    return;
  }

  let failed: boolean = result.report.summary.failed > 0;

  if (!failed) {
    // pass
    final = {
      completed: true,
      msg: `Task ${taskPosition} Complete`,
      taskPosition
    };
  } else {
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
      taskPosition: taskPosition - 1,
      timedOut: false // TODO
    };

  }

  return final;
}
