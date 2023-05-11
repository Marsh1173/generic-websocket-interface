import { UserDao } from "../server/database/users/UserDao";
import { DB } from "../server/database/utils/DB";

const users_table_name: string = "users";
const username: string | undefined = process.argv[2];
const password: string | undefined = process.argv[3];

if (username && password) {
  try {
    let db = DB.init();
    let user_dao: UserDao = new UserDao(db, users_table_name);

    const results = user_dao.change_user_password(password, username);
    if (results.success) {
      console.log("SUCCESS: Changed user password to " + password);
    } else {
      console.error("ERROR: " + results.msg);
    }
  } catch (err) {
    console.error(err);
  }
} else {
  console.error(
    "ERROR: Usage: yarn change-user-password <username> <new password>"
  );
}
