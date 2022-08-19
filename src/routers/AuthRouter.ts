import Router from "koa-router";
import passport from "koa-passport";
import { DocumentType } from "@typegoose/typegoose";
import jwt from "jsonwebtoken";

import { BadRequestError } from "utils/Errors";
import { UserClass } from "models/UserModel";
import userController from "controllers/UserController";
import verifyRefreshToken from "middlewares/VerifyRefreshToken";

const router = new Router({
  prefix: "/auth",
});

router.post("/join", async ctx => {
  await userController.createUser(ctx);
});

router.post("/login", (ctx, next) =>
  passport.authenticate("local", async (passportError, user: DocumentType<UserClass> | false, info) => {
    if (passportError || !user) {
      throw new BadRequestError("Failed to login", info);
    }

    const accessToken = jwt.sign(
      {
        type: "JWT",
        userID: user._id,
      },
      process.env.JWT_SECRET_KEY ?? "",
      {
        expiresIn: "1m",
      }
    );

    const refreshToken = jwt.sign(
      {
        type: "JWT",
        userID: user._id,
      },
      process.env.JWT_SECRET_KEY ?? "",
      {
        expiresIn: "1h",
      }
    );

    ctx.cookies.set("accessToken", accessToken, { httpOnly: true });
    ctx.cookies.set("refreshToken", refreshToken, { httpOnly: true });

    ctx.body = {
      message: `${user.username} logged in!`,
    };
  })(ctx, next)
);

router.post("/refresh", verifyRefreshToken, ctx => {
  const accessToken = jwt.sign(
    {
      type: "JWT",
      userID: ctx.state.userID,
    },
    process.env.JWT_SECRET_KEY ?? "",
    {
      expiresIn: "1m",
    }
  );

  ctx.cookies.set("accessToken", accessToken, { httpOnly: true });

  ctx.body = {
    message: "Refreshed the access token!",
  };
});

export default router;
