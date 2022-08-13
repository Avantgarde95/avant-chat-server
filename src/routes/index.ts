import Router from "koa-router";

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Hello, world!";
});

export default router;
