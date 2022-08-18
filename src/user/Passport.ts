import passport from "koa-passport";
import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from "passport-local";

import { UserModel } from "user/models/User";
import { verifyPassword } from "user/PasswordUtils";

const localOptions: IStrategyOptions = {
  usernameField: "username",
  passwordField: "password",
};

const verifyLocal: VerifyFunction = async (username, password, done) => {
  const user = await UserModel.findByUsername(username);

  // Check existence.
  if (user === null) {
    done(null, false, { message: `User ${username} doesn't exist!` });
    return;
  }

  // Check the password.
  if (!(await verifyPassword(password, user.passwordHash, user.passwordSalt))) {
    done(null, false, { message: "Wrong password!" });
    return;
  }

  done(null, user);
};

export const localStrategy = new LocalStrategy(localOptions, verifyLocal);
