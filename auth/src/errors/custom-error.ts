// abstract class for custom errors
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // for logging purposes
    super(message);
    // Only because we are extending a built-in class, we need to do this.
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
