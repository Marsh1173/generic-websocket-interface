import { LocalStorage } from "../../utils/LocalStorage";

export abstract class FetchStoredLogin {
  public static fetch(on_find: (username: string) => void) {
    let last_used_username: string | undefined =
      LocalStorage.get_local_storage_item("login-username");

    if (last_used_username) {
      on_find(last_used_username);
    }
  }
}
