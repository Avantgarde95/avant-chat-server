import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from "passport-local";

import UserModel from "models/UserModel";
import { verifyPassword } from "utils/PasswordUtils";

const options: IStrategyOptions = {
  usernameField: "username",
  passwordField: "password",
};

const verify: VerifyFunction = async (username, password, done) => {
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

export default new LocalStrategy(options, verify);
