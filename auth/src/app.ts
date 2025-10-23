import express, { Express } from "express";
import { NotFoundError } from "./errors/not-found-error.ts";
import { errorHandler } from "./middlewares/error-handler.ts";
import currentUserRouter from "./routes/current-user.ts";
import signinRouter from "./routes/signin.ts";
import signoutRouter from "./routes/signout.ts";
import signupRouter from "./routes/signup.ts";
import cookieSession from "cookie-session";
export const app: Express = express();

app.use(express.json());

// trust traffic from ingress-nginx proxy, so that secure cookies work
app.set("trust proxy", true);
// configure cookie session middleware, so that we can use req.session(default name is session)
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Handle all other routes /api/users/* that are not defined
app.all("/{*any}", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
