import Router from "koa-router";
import passport from "koa-passport";
import { DocumentType } from "@typegoose/typegoose";

import { UserClass } from "user/models/User";
import authController from "user/controllers/UserController";
import { BadRequestError } from "common/Errors";

const router = new Router({
  prefix: "/auth",
});

router.post("/join", async ctx => {
  await authController.createUserByLocal(ctx);
});

router.post("/login", (ctx, next) =>
  passport.authenticate(
    "local",
    { session: false },
    async (passportError, user: DocumentType<UserClass> | false, info) => {
      if (passportError || !user) {
        throw new BadRequestError("Failed to login", info);
      }

      ctx.body = { message: `${user.username} logged in!` };
    }
  )(ctx, next)
);

export default router;
