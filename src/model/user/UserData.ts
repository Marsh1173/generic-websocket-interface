export type UserId = string;
export interface UserData {
  readonly user_id: UserId;
  readonly email_address: string;
  readonly password: string;
  readonly salt: string;
}

export type SafeUserData = Omit<
  UserData,
  "password" | "salt" | "email_address"
>;

export type RegisterUserData = Omit<UserData, "salt">;
export type LoginUserData = Pick<UserData, "password" | "user_id">;

export abstract class UserData {
  public static readonly UserIdMaxLength: number = 20;
  public static readonly PasswordMaxLength: number = 20;
  public static readonly EmailMaxLength: number = 50;

  private static UserIdRegex: RegExp = /^[A-Za-z0-9]$/;
  public static is_valid_user_id(user_id: string): boolean {
    return this.UserIdRegex.test(user_id);
  }

  private static EmailRegex: RegExp =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public static is_valid_email(email: string): boolean {
    return this.EmailRegex.test(email);
  }
}
