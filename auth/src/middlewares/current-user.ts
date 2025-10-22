import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// modify the Express Request interface to include currentUser
declare global {
  namespace Express {
    interface Request {
      // ? means it is optional, may be undefined if not logged in
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // payload is the decoded JWT token, including id and email
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    // attach the payload (object of id and email) to req.currentUser
    req.currentUser = payload;
  } catch (err) {}

  next();
};
