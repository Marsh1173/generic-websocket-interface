export namespace Assertions {
  class AssertionError extends Error {}

  function make_console_readable(val: any): string {
    if (typeof val === "object") {
      return JSON.stringify(val);
    } else {
      return val;
    }
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
    value: T,
    expected_value: T,
    equals?: (value: T, expected_value: T) => boolean
  ) {
    let are_equal: boolean = equals
      ? equals(value, expected_value)
      : value === expected_value;
    assert(
      are_equal,
      make_console_readable(value) +
        " (result) and " +
        make_console_readable(expected_value) +
        " (expected) must be equal"
    );
  }

  export function assert_throws_error(f: () => void) {
    let threw: boolean = false;
    try {
      f();
    } catch (e) {
      threw = true;
    }

    assert(threw, "Code did not throw an expected error");
  }
}
