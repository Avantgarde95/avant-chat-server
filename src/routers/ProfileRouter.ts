import Router from "koa-router";

import ProfileController from "controllers/ProfileController";
import verifyAccessToken from "middlewares/VerifyAccessToken";

const router = new Router({
  prefix: "/profile",
});

router.get("/", verifyAccessToken, async ctx => {
  await ProfileController.getProfile(ctx, ctx.state.userID);
});

router.post("/", verifyAccessToken, async ctx => {
  await ProfileController.updateProfile(ctx, ctx.state.userID);
});

export default router;
