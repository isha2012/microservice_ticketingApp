import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signUpRouter } from "./routes/signup";
// import errorHandler from "../../common/src/middleware/errorHandler";
import errorHandler from "@isha7876/common/dist/common/src/middleware/errorHandler";
import { connectDB } from "./db/connectDb";
import cookieSession from "cookie-session";
import { signInRouter } from "./routes/signin";
import { BadRequestError, ValidationError } from "@isha7876/common/dist/common/src";


const app = express();
app.set('trust proxy', true); // to check more on this.
app.use(express.json({ limit: "50mb" })); // support json encoded bodies

app.use(cookieSession({
      signed: false,
      // secure: true
}));



app.use("/users/signIn", signInRouter);
app.use("/users/signUp", signUpRouter);

app.use(errorHandler);

app.use(currentUserRouter);


export { app }