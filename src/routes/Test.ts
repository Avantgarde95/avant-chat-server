import Router from "koa-router";

import { shortenString } from "utils/StringUtils";

const router = new Router({
  prefix: "/test",
});

router.get("/", (ctx, next) => {
  ctx.body = "GET";
});

router.post("/", (ctx, next) => {
  ctx.body = `POST: Received ${shortenString(JSON.stringify(ctx.request.body ?? "{}"), 10)}`;
});

export default router;
