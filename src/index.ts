import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import indexRouter from "routes";
import testRouter from "routes/Test";

dotenv.config();

const app = new Koa();
const port = 4000;

app.use(bodyParser());

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());
app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

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
