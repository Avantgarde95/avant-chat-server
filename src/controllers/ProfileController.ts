import { Context } from "koa";

import ProfileModel from "models/ProfileModel";
import { BadRequestError } from "utils/Errors";

async function getProfile(ctx: Context, userID: string) {
  let profile = await ProfileModel.findByUserID(userID);

  // If not exist, create one.
  if (profile === null) {
    profile = await ProfileModel.createNew(userID);
  }

  ctx.body = {
    avatarURL: profile.avatarURL,
    description: profile.description,
  };
}

async function updateProfile(ctx: Context, userID: string) {
  const avatarURL = ctx.request.body.avatarURL ?? "";
  const description = ctx.request.body.description ?? "";
  const profile = await ProfileModel.findByUserID(userID);

  if (profile === null) {
    throw new BadRequestError("Can't find the profile!");
  }

  await profile.updateValues(avatarURL, description);
  ctx.body = { message: "Update successful!" };
}

export default {
  getProfile,
  updateProfile,
};
