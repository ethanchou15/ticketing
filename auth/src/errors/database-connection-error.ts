import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to db");
    // Only because we are extending a built-in class, we need to do this.
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    // array of objects(errors) with message and field
    return [{ message: this.reason }];
  }
}
