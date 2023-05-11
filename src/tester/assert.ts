export namespace Assertions {
  class AssertionError extends Error {}

  function make_console_readable(val: any): string {
    return JSON.stringify(val);
  }

  function assert(condition: boolean, assertion: string) {
    if (!condition) {
      throw new AssertionError("Assertion failed: " + assertion);
    }
  }

  export function assertTrue(condition: boolean): asserts condition {
    assert(condition, condition + " must be true");
  }

  export function assertFalse(condition: boolean): asserts condition is false {
    assert(!condition, condition + " must be false");
  }

  export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    assert(val !== null, val + " must not be null");
    assert(val !== undefined, val + " must not be undefined");
  }

  export function assertEquals<T>(
    val1: T,
    val2: T,
    equals?: (val1: T, val2: T) => boolean
  ) {
    let are_equal: boolean = equals ? equals(val1, val2) : val1 === val2;
    assert(
      are_equal,
      make_console_readable(val1) +
        " and " +
        make_console_readable(val2) +
        " must be equal"
    );
  }
}
