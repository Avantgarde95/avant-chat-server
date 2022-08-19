import { Context } from "koa";

import { BadRequestError } from "utils/Errors";
import UserModel from "models/UserModel";

async function createUser(ctx: Context) {
  const { username, password } = ctx.request.body;

  if ((await UserModel.findByUsername(username)) !== null) {
    throw new BadRequestError(`${username} already exists!`);
  }

  await UserModel.createNew(username, password);
  ctx.body = { message: `${username} joined!` };
}

export default {
  createUser,
};
