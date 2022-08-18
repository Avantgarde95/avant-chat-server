import Koa from "koa";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { httpErrorHandler } from "common/Middlewares";
import { localStrategy } from "user/Passport";
import healthRouter from "health/routers/HealthRouter";
import authRouter from "user/routers/AuthRouter";

dotenv.config();

const app = new Koa();
const port = 4000;

app.use(httpErrorHandler);

app.use(bodyParser());

app.use(passport.initialize());
passport.use(localStrategy);

app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

(async () => {
  const dbURL = process.env.MONGODB_URL;

  if (typeof dbURL === "undefined") {
    throw new Error("No DB URL!");
  }

  await mongoose.connect(dbURL, { dbName: "avant-chat" });

  app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
  });
})();
