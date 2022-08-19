import Router from "koa-router";

const router = new Router({
  prefix: "/health",
});

router.get("/", ctx => {
  ctx.body = "OK";
});

export default router;
