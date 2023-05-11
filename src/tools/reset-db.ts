import {
  create_user_table_string,
  UserDao,
} from "../server/database/users/UserDao";
import { DB } from "../server/database/utils/DB";

const users_table_name: string = UserDao.default_table_name;

async function init() {
  let db = DB.init(false);

  try {
    db.prepare("drop table " + users_table_name + ";").run();
  } catch (er) {
    console.error(er);
  }

  db.prepare(create_user_table_string(users_table_name)).run();
}

init();
