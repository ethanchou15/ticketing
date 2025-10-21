import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

// Centralized error handling middleware, next is required for Express to identify it as an error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // Generic error handler for other types of errors
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
