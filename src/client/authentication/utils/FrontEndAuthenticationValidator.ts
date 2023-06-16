import { UserRecord } from "../../../model/user/UserData";

export class FrontEndAuthenticationValidator {
  public static validate_registration(
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ): string[] {
    let errs: string[] = [];
    if (password !== confirm_password) {
      errs.push("Passwords must match.");
    } else if (password === "") {
      errs.push(`Password must not be empty.`);
    } else if (password.length > UserRecord.PasswordMaxLength) {
      errs.push(
        `Password must have at most ${UserRecord.PasswordMaxLength} characters.`
      );
    }

    if (username.length > UserRecord.UserIdMaxLength) {
      errs.push(
        `Username must have at most ${UserRecord.UserIdMaxLength} characters.`
      );
    } else if (username.length < UserRecord.UserIdMinLength) {
      errs.push(
        `Username must have at least ${UserRecord.UserIdMinLength} characters.`
      );
    } else if (!UserRecord.is_valid_user_id(username)) {
      errs.push("Only alphanumeric characters are allowed in your username.");
    }

    if (!UserRecord.is_valid_email(email)) {
      errs.push("Please enter a valid email.");
    } else if (email.length > UserRecord.EmailMaxLength) {
      errs.push(
        `Email must have at most ${UserRecord.EmailMaxLength} characters.`
      );
    }
    return errs;
  }

  private constructor() {}
}
