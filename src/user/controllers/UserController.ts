import { Context } from "koa";

import { UserModel } from "user/models/User";
import { BadRequestError } from "common/Errors";

async function createUserByLocal(ctx: Context) {
  const { username, password } = ctx.request.body;

  if ((await UserModel.findByUsername(username)) !== null) {
    throw new BadRequestError(`${username} already exists!`);
  }

  await UserModel.createByLocal(username, password);
  ctx.body = { message: `${username} joined!` };
}

const controller = {
  createUserByLocal,
};

export default controller;
