export type UserId = string;
export interface UserRecord {
  readonly user_id: UserId;
  readonly email_address: string;
  readonly password: string;
  readonly salt: string;
}

export type UserData = Omit<UserRecord, "password" | "salt" | "email_address">;

export type RegisterUserData = Omit<UserRecord, "salt">;
export type LoginUserData = Pick<UserRecord, "password" | "user_id">;

export abstract class UserRecord {
  public static readonly UserIdMaxLength: number = 20;
  public static readonly PasswordMaxLength: number = 20;
  public static readonly EmailMaxLength: number = 50;

  private static UserIdRegex: RegExp = /^[A-Za-z0-9]$/;
  public static is_valid_user_id(user_id: string): boolean {
    return this.UserIdRegex.test(user_id);
  }

  private static EmailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public static is_valid_email(email: string): boolean {
    return this.EmailRegex.test(email);
  }
}
