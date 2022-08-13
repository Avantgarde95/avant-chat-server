import { prop, getModelForClass } from "@typegoose/typegoose";

class UserClass {
  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public passwordHash!: string;

  @prop({ required: true })
  public salt!: string;
}

export const UserModel = getModelForClass(UserClass);
