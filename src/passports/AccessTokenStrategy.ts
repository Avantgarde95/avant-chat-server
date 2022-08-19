import { StrategyOptions, VerifyCallback, Strategy as TokenStrategy } from "passport-jwt";

import UserModel from "models/UserModel";

const options: StrategyOptions = {
  jwtFromRequest: request => request.cookies.get("accessToken"),
  secretOrKey: process.env.JWT_SECRET_KEY ?? "",
};

const verify: VerifyCallback = async (payload, done) => {
  const user = await UserModel.findByUserID(payload.userID);

  if (user === null) {
    done(null, false, { message: "User doesn't exist!" });
    return;
  }

  done(null, user);
};

export default new TokenStrategy(options, verify);
