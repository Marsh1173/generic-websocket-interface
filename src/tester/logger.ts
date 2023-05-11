export namespace Logger {
  export function log_test_output(
    msg: string,
    color: "pass" | "fail" | "normal"
  ) {
    let color_code: number = 90;
    switch (color) {
      case "fail":
        color_code = 31;
        break;
      case "pass":
        color_code = 32;
        break;
      case "normal":
        color_code = 90;
        break;
    }

    console.log("\u001b[" + color_code + "m" + msg + "\u001b[0m");
  }
}
