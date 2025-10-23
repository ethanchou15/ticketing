import { connect } from "mongoose";
import { app } from "./app";

const start = async () => {
  // check if JWT_KEY is defined
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  // Connect to MongoDB, service name is auth-mongo-srv, port 27017, database name is auth
  try {
    await connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Auth service running on port 3000!!!");
  });
};

start();
