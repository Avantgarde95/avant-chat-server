import Router from "koa-router";

const router = new Router({
  prefix: "/health",
});

router.get("/", (ctx, next) => {
  ctx.body = "OK";
});

export default router;
