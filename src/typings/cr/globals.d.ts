interface ParseFinal {
  completed: boolean;
  msg: string;
  taskPosition: number;
  timedOut?: boolean;
}

interface PyTest {
  name: string;
  teardown: Object;
  setup: Object;
  run_index: number;
  call: {
    duration: number;
    outcome: string;
    name: string;
    longrepr: string;
  };
  duration: number;
  outcome: string;
}
