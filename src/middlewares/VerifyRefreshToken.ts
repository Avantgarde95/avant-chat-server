import { Context, Next } from "koa";
import passport from "koa-passport";
import { DocumentType } from "@typegoose/typegoose";

import { UserClass } from "models/UserModel";
import { UnauthorizedError } from "utils/Errors";

/**
 * Verify the refresh token, and store userID on ctx.state if verification succeeded.
 */
export default function verifyRefreshToken(ctx: Context, next: Next) {
  return passport.authenticate("refreshToken", async (passportError, user: DocumentType<UserClass> | false, info) => {
    if (passportError || !user) {
      throw new UnauthorizedError("No permission", info);
    }

    ctx.state.userID = user._id;
    await next();
  })(ctx, next);
}
