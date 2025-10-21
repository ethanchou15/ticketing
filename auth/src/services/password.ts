import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// scrypt is a callback-based function, we convert scrypt to return a promise, so we can use async/await
const scryptAsync = promisify(scrypt);

export class Password {
  // hash the password with a salt
  static async toHash(password: string) {
    // generate a random salt
    const salt = randomBytes(8).toString("hex");
    // hash the password with the salt, 64 bytes length
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    // combine the hashed password and salt, separated by a dot
    return `${buf.toString("hex")}.${salt}`;
  }

  // compare a supplied password with the stored hashed password
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    // hash the supplied password with the same salt
    const buf = (await scryptAsync(suppliedPassword, salt!, 64)) as Buffer;
    // compare the hashed supplied password with the stored hashed password
    return buf.toString("hex") === hashedPassword;
  }
}
