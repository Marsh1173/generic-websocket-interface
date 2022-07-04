import { UserDBAccessor } from "../server/Database/UserDBAccessor";

export function log_test_output(msg: string, color: "pass" | "fail" | "normal") {
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

console.group("Testing");
console.time("Time taken to run tests");

try {

    let db_accessor: UserDBAccessor = new UserDBAccessor();
    db_accessor.register_user({user_id: 1, name: "Nate", encoded_password: "abcd"}, (success: boolean, msg?: string) => {
        console.log("Register user success: " + success)
        if(msg) {
            console.log(msg)
        }
    });

    log_test_output("All tests ran", "pass");
} catch (err: any) {
    console.log(err)
}

console.timeEnd("Time taken to run tests");
console.groupEnd();
