import dotenv from "dotenv";

dotenv.config();

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import mongoose from "mongoose";

import catchHTTPError from "middlewares/CatchHTTPError";
import localStrategy from "passports/LocalStrategy";
import accessTokenStrategy from "passports/AccessTokenStrategy";
import refreshTokenStrategy from "passports/RefreshTokenStrategy";
import healthRouter from "routers/HealthRouter";
import authRouter from "routers/AuthRouter";
import profileRouter from "routers/ProfileRouter";

const app = new Koa();
const port = 4000;

app.use(catchHTTPError);

app.use(bodyParser());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("accessToken", accessTokenStrategy);
passport.use("refreshToken", refreshTokenStrategy);

app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(profileRouter.routes());
app.use(profileRouter.allowedMethods());

(async () => {
  console.log("Server start!");
  const dbURL = process.env.MONGODB_URL;

  if (typeof dbURL === "undefined") {
    throw new Error("No DB URL!");
  }

  await mongoose.connect(dbURL, { dbName: "avant-chat" });
  console.log("Connected to the database!");

  app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
  });
})();
