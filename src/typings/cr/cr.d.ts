declare module CR {

interface TestResult {
    pass: boolean;
    taskPosition: number;
    msg?: string;
    timedOut?: boolean;
    change: number;
    completed: boolean;
  }

  interface Config {
    dir: string;
    package?: string;
    testRunner?: string;
    tutorial?: string;
    tutorialDir?: string;
    tutorialOptions?: Object;
    issuesPath?: string;
    repo?: string;
    edit?: boolean;
    runner?: any;
    taskPosition?: number;
  }

}

interface Process {
  resourcesPath: string;
}
