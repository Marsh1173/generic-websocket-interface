import { UserRecord } from "../../../model/user/UserData";

export class FrontEndAuthenticationValidator {
  public static front_end_validate_username_and_password(username: string, password: string): string[] {
    let errs: string[] = [];
    if (username === "" && password === "") {
      errs.push("Please enter your username and password.");
    } else if (username === "") {
      errs.push("Please enter your username.");
    } else if (password === "") {
      errs.push("Please enter your password.");
    }
    return errs;
  }

  public static validate_email(email: string): string | undefined {
    if (!UserRecord.is_valid_email(email)) {
      return "Please enter a valid email.";
    }
    return undefined;
  }

  private constructor() {}
}
