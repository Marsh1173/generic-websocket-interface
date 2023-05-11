import { Id } from "../../../model/utils/Id";
import { User } from "./User";

export abstract class UserMap<UserType extends User<any, any>> {
  private readonly users: Map<Id, UserType> = new Map();

  public disconnect_user(id: Id): void {
    this.users.delete(id);
  }

  protected attach_user_to_map(user: UserType) {
    this.users.set(user.id, user);
  }

  protected get_user(f: (user: UserType) => boolean): UserType | undefined {
    return Array.from(this.users).find(([id, user]) => f(user))?.[1];
  }
}
