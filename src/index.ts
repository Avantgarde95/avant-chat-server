import Koa from "koa";

import indexRouter from "routes";
import healthRouter from "routes/Health";

const app = new Koa();
const port = 4000;

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());
app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
