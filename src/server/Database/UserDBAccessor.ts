import { DBAccessor } from "./DBAccessor"
import { UserModel } from "./UserModel";

export interface LoginSuccess {
    success: true,
    msg: string;
    user: UserModel
}
export interface LoginFailure {
    success: false,
    msg: string;
}

export class UserDBAccessor extends DBAccessor<UserModel> {
    protected table_filename: string = "src/test/User.json";
    
    public register_user(new_user: UserModel, callback: (success: boolean, msg?: string) => void) {
        console.log("here");
        this.open_table_file((users: UserModel[]) => {

            if(users.find((user) => user.name === new_user.name)) {
                callback(false, "Username already taken");
            } else {
                this.write_table_file(new_user, () => {
                    callback(true, "Registered successfully");
                }, () => {
                    this.file_not_found_callback();
                    callback(false, "500 Error: User database not found");
                })
            }

        }, () => {
            this.file_not_found_callback();
            callback(false, "500 Error: User database not found");
        });
    }

    public validate_user(username: string, password: string, callback: (results: LoginSuccess | LoginFailure) => void) {
        this.open_table_file((users: UserModel[]) => {

            let user: UserModel | undefined = users.find((user) => user.name === username && user.encoded_password === password);

            if(user) {
                callback({success: true, msg: "Login succeeded! Welcome, " + username + ".", user});
            } else {
                callback({success: false, msg: "Username or password incorrect."});
            }

        }, () => {
            this.file_not_found_callback();
            callback({success: false, msg: "500 Error: User database not found"});
        });
    }

    protected file_not_found_callback = () => {
        console.error("ERROR! Could not find User Model json file.");
    }

}