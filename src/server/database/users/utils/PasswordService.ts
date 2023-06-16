let crypto = require("crypto");

export interface HashAndSalt {
  hash: string;
  salt: string;
}

export abstract class PasswordService {
  public static hash_password(password: string): HashAndSalt {
    let salt = crypto.randomBytes(16).toString("hex");
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 16, `sha512`).toString(`hex`);
    return {
      hash,
      salt,
    };
  }

  public static check_password(password_attempt: string, data: HashAndSalt): boolean {
    let hash = crypto.pbkdf2Sync(password_attempt, data.salt, 1000, 16, `sha512`).toString(`hex`);
    return hash === data.hash;
  }
}
