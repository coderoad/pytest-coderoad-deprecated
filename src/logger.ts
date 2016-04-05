const unexpectedOutput: RegExp = /^(?!# TAP)(?!(not )?ok [0-9]+ -)(?!1..[0-9]+)(?!# E\s)(.*)$/gm;

// capture any unexpected output to the log
export default function logger(data: string): void {
  var logs: string[] = data.match(unexpectedOutput);
  if (!logs && logs.length < 1) {
    return;
  }
  logs.forEach((line: string) => {
    if (line.length > 0) {
      try {
        line = JSON.parse(JSON.stringify(line));
        console.dir(JSON.parse(JSON.stringify(line)));
      } catch (e) {
        console.log(line);
      }
    }
  });
}
