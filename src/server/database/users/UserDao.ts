import BetterSqlite3 from "better-sqlite3";
import { HashAndSalt, PasswordService } from "./utils/PasswordService";
import { DAO } from "../utils/Dao";
import { FailureMsg, Success } from "../../utils/ReturnMsg";
import { ReturnMsg } from "../../utils/ReturnMsg";
import {
  LoginUserData,
  RegisterUserData,
  UserRecord,
  UserData,
  UserId,
} from "../../../model/user/UserData";
import { ValidateUserData } from "./utils/ValidateUserData";
import {
  AuthenticationReturnMsg,
  AuthenticationSuccess,
} from "../../authentication/UserValidator";

export const email_or_userid_taken_string: string =
  "Email or user id already taken.";

export const create_user_table_string = (table_name: string) => {
  return `CREATE TABLE '${table_name}' (\
    'user_id' VARCHAR(${UserRecord.UserIdMaxLength}) PRIMARY KEY NOT NULL,\
    'email_address' VARCHAR(${UserRecord.EmailMaxLength}) NOT NULL,\
    'password' VARCHAR(${UserRecord.PasswordMaxLength}) NOT NULL,\
    'salt' VARCHAR(32) NOT NULL,\
    UNIQUE (email_address)\
    );`;
};

export interface FetchUsersSuccess extends Success {
  users: UserData[];
}

export interface IUserDao {
  register_user(data: RegisterUserData): AuthenticationReturnMsg;
  validate_login(data: LoginUserData): AuthenticationReturnMsg;
  change_user_password(new_password: string, user_id: UserId): ReturnMsg;
  delete_user(user_id: UserId): ReturnMsg;
}

export class UserDao extends DAO implements IUserDao {
  public static default_table_name: string = "users";

  private readonly get_all_users_statement: BetterSqlite3.Statement<any[]>;
  private readonly insert_user: BetterSqlite3.Statement<any[]>;
  private readonly get_user: BetterSqlite3.Statement<any[]>;
  private readonly update_password: BetterSqlite3.Statement<any[]>;
  private readonly delete_user_statement: BetterSqlite3.Statement<any[]>;

  constructor(
    private readonly db: BetterSqlite3.Database,
    private readonly table_name: string = UserDao.default_table_name
  ) {
    super();

    this.get_all_users_statement = this.db.prepare(
      `SELECT user_id \
      FROM ${this.table_name};`
    );

    this.insert_user = this.db.prepare(
      `INSERT INTO ${this.table_name} (user_id, email_address, password, salt) VALUES (?, ?, ?, ?);`
    );

    this.get_user = this.db.prepare(
      `SELECT * FROM ${this.table_name} WHERE user_id = ?;`
    );

    this.update_password = this.db.prepare(
      `UPDATE ${this.table_name} SET password = ?, salt = ? WHERE user_id = ?`
    );

    this.delete_user_statement = this.db.prepare(
      `DELETE FROM ${this.table_name} WHERE user_id = ?`
    );
  }

  public register_user(data: RegisterUserData): AuthenticationReturnMsg {
    let validate_user_data_results: ReturnMsg = ValidateUserData.validate(data);
    if (!validate_user_data_results.success) {
      return validate_user_data_results;
    }

    let hash_and_salt: HashAndSalt = PasswordService.hash_password(
      data.password
    );

    let insert_results = this.catch_database_errors_run(
      () => {
        this.insert_user.run(
          data.user_id,
          data.email_address,
          hash_and_salt.hash,
          hash_and_salt.salt
        );
        return { success: true };
      },
      new Map([
        ["SQLITE_CONSTRAINT_PRIMARYKEY", email_or_userid_taken_string],
        ["SQLITE_CONSTRAINT_UNIQUE", email_or_userid_taken_string],
      ])
    );

    if (!insert_results.success) {
      return insert_results;
    } else {
      return { success: true, user_data: { user_id: data.user_id } };
    }
  }

  public validate_login(data: LoginUserData): AuthenticationReturnMsg {
    return this.catch_database_errors_get<AuthenticationSuccess>(() => {
      const failed_attempt: FailureMsg = {
        success: false,
        msg: "Incorrect username or password",
      };

      let user_data: UserRecord | undefined = this.get_user.get(data.user_id);
      if (user_data === undefined) {
        return failed_attempt;
      }

      let valid_password: boolean = PasswordService.check_password(
        data.password,
        {
          hash: user_data.password,
          salt: user_data.salt,
        }
      );

      if (valid_password) {
        return {
          success: true,
          user_data: {
            user_id: user_data.user_id,
          },
        };
      } else {
        return failed_attempt;
      }
    });
  }

  public change_user_password(
    new_password: string,
    user_id: UserId
  ): ReturnMsg {
    return this.catch_database_errors_run(() => {
      let user_data: UserData | undefined = this.get_user.get(user_id);
      if (user_data === undefined) {
        return { success: false, msg: "User not found" };
      }

      let password_validation: ReturnMsg =
        ValidateUserData.validate_password(new_password);
      if (!password_validation.success) {
        return password_validation;
      }

      let hash_and_salt: HashAndSalt =
        PasswordService.hash_password(new_password);
      this.update_password.run(hash_and_salt.hash, hash_and_salt.salt, user_id);
      return { success: true };
    });
  }

  public delete_user(user_id: UserId): ReturnMsg {
    return this.catch_database_errors_run(() => {
      this.delete_user_statement.run(user_id);
      return { success: true };
    });
  }
}
