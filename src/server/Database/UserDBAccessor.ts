import { SERVER_CONFIG } from "../Config";
import { DBAccessor } from "./DBAccessor"
import { UserModel } from "./UserModel";

export interface AuthSuccess {
    success: true,
    msg: string;
    user: UserModel
}
export interface AuthFailure {
    success: false,
    msg: string;
}

export class UserDBAccessor extends DBAccessor<UserModel> {
    protected table_filename: string = SERVER_CONFIG.database_path + "User.json";
    protected table_label: string = "users";
    
    public register_user(new_user: UserModel): AuthSuccess | AuthFailure {
        let users: UserModel[] = this.open_table_file();
        if(users.find((user) => user.name === new_user.name)) {
            return {success: false, msg: "Username already taken"};
        } else {
            this.write_table_file([new_user]);
            return {success: true, msg: "Registered successfully", user: new_user};
        }
    }

    public validate_user(username: string, password: string): AuthSuccess | AuthFailure {
        let users: UserModel[] = this.open_table_file();
        let user: UserModel | undefined = users.find((user) => user.name === username && user.encoded_password === password);

        if(user) {
            return {success: true, msg: "Login succeeded! Welcome, " + username + ".", user};
        } else {
            return {success: false, msg: "Username or password incorrect."};
        }
    }

    public clear_users() {
        this.overwrite_table_file([]);
    }

}