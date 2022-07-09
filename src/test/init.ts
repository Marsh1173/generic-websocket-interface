import { SERVER_CONFIG } from "../server/Config";
import { UserDBAccessor } from "../server/Database/UserDBAccessor";
import { AuthSuccess, AuthFailure } from "../server/Database/UserDBAccessor";

function log_test_output(msg: string, color: "pass" | "fail" | "normal") {
    let color_code: number = 90;
    switch (color) {
        case "fail":
            color_code = 31;
            break;
        case "pass":
            color_code = 32;
            break;
        case "normal":
            color_code = 90;
            break;
    }

    console.log('\u001b[' + color_code + 'm' + msg + '\u001b[0m');
}

function assert(condition: boolean, test_msg: string) {
    if(condition) {
        log_test_output("Test succeeded: " + test_msg, "pass");
    } else {
        log_test_output("Test failed: " + test_msg, "fail");
    }
}

SERVER_CONFIG.database_path = "src/test/";



console.group("Testing");
console.time("Time taken to run tests");

try {

    console.group("Testing database");
    let db_accessor: UserDBAccessor = new UserDBAccessor();
    db_accessor.clear_users();
    let register_results: AuthSuccess | AuthFailure = db_accessor.register_user({user_id: 1, name: "Nate", encoded_password: "abcd"});
    assert(register_results.success === true, "register user success");
    register_results = db_accessor.register_user({user_id: 1, name: "Nate", encoded_password: "abcd"});
    assert(register_results.success === false, "register duplicate user failure");
    let login_results: AuthSuccess | AuthFailure = db_accessor.validate_user("Nate", "abcd");
    assert(login_results.success === true, "login user success");
    login_results = db_accessor.validate_user("Nate", "abcde");
    assert(login_results.success === false, "login user failure");
    db_accessor.clear_users();
    login_results = db_accessor.validate_user("Nate", "abcd");
    assert(login_results.success === false, "login non-existent user failure");
    console.groupEnd();

    log_test_output("All tests have been run.", "normal");
} catch (err: any) {
    console.log(err)
}

console.timeEnd("Time taken to run tests");
console.groupEnd();
