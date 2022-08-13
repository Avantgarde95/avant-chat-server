import Koa from "koa";
import dotenv from "dotenv";

import indexRouter from "routes";
import healthRouter from "routes/Health";
import mongoose from "mongoose";
import { UserModel } from "models/User";

dotenv.config();

const app = new Koa();
const port = 4000;

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());
app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());

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
