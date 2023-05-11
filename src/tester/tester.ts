import { Logger } from "./logger";

export namespace Tester {
  let tests_passed = 0;
  let tests_failed = 0;

  const quiet: boolean = process.argv.includes("-quiet");
  const timer: boolean = process.argv.includes("-timer");

  export function run(name: string, tests: [string, () => void][]) {
    if (timer) console.time(name);
    console.group("Running tests for " + name);
    for (const test of tests) {
      safely_run_individual_test(test);
    }
    console.groupEnd();
    if (timer) console.timeEnd(name);

    if (tests_failed !== 0) {
      Logger.log_test_output("Not all tests for " + name + " passed.", "fail");
    } else {
      Logger.log_test_output("All tests for " + name + " passed.", "pass");
    }
  }

  function safely_run_individual_test(test: [string, () => void]) {
    if (timer) console.time(test[0]);
    if (!quiet) console.group("Testing " + test[0]);
    try {
      test[1]();
      tests_passed += 1;
      if (!quiet) Logger.log_test_output("Test passed: " + test[0], "pass");
    } catch (e) {
      console.error(e);
      tests_failed += 1;
      Logger.log_test_output("Test failed: " + test[0], "fail");
    }
    if (!quiet) console.groupEnd();
    if (timer) console.timeEnd(test[0]);
  }
}
