import { ReturnMsg } from "../../../utils/ReturnMsg";
import { RegisterUserData, UserRecord } from "../../../../model/user/UserData";

export class ValidateUserData {
  public static validate(data: RegisterUserData): ReturnMsg {
    let validate_user_id_results = this.validate_user_id(data.user_id);
    if (!validate_user_id_results.success) {
      return validate_user_id_results;
    }

    let validate_email_results = this.validate_email(data.email_address);
    if (!validate_email_results.success) {
      return validate_email_results;
    }

    let validate_password_results = this.validate_password(data.password);
    if (!validate_password_results.success) {
      return validate_password_results;
    }

    return { success: true };
  }

  private static validate_user_id(user_id: string): ReturnMsg {
    if (user_id === "") {
      return { success: false, msg: this.errs.user_id.not_empty };
    } else if (!UserRecord.is_valid_user_id(user_id)) {
      return {
        success: false,
        msg: this.errs.user_id.only_letters_and_numbers,
      };
    } else if (user_id.length > UserRecord.UserIdMaxLength) {
      return {
        success: false,
        msg: this.errs.user_id.max_length,
      };
    }

    return { success: true };
  }

  private static validate_email(email: string): ReturnMsg {
    if (email === "") {
      return { success: false, msg: this.errs.email.not_empty };
    } else if (email.length > UserRecord.EmailMaxLength) {
      return {
        success: false,
        msg: this.errs.email.max_length,
      };
    } else if (!UserRecord.is_valid_email(email)) {
      return {
        success: false,
        msg: this.errs.email.valid,
      };
    }

    return { success: true };
  }

  public static validate_password(password: string): ReturnMsg {
    if (password === "") {
      return { success: false, msg: this.errs.password.not_empty };
    } else if (password.length > UserRecord.PasswordMaxLength) {
      return {
        success: false,
        msg: this.errs.password.max_length,
      };
    }

    return { success: true };
  }

  private constructor() {}

  public static errs = {
    email: {
      not_empty: "Please provide an email.",
      valid: `Please provide a valid email address.`,
      max_length: `Email can only contain up to ${UserRecord.EmailMaxLength} characters.`,
    },
    password: {
      not_empty: "Please provide a password.",
      max_length: `Password can only contain up to ${UserRecord.PasswordMaxLength} characters.`,
    },
    user_id: {
      not_empty: "Please provide a user id.",
      only_letters_and_numbers: "User id can only contain letters and numbers.",
      max_length: `User id can only contain up to ${UserRecord.UserIdMaxLength} characters.`,
    },
  };
}
