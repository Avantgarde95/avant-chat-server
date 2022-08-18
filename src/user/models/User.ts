import { prop, getModelForClass, ReturnModelType } from "@typegoose/typegoose";

import { generatePasswordHash } from "user/PasswordUtils";

export class UserClass {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true })
  public passwordHash!: string;

  @prop({ required: true })
  public passwordSalt!: string;

  public static async findByUsername(this: ReturnModelType<typeof UserClass>, username: string) {
    return await this.findOne({ username: username }).exec();
  }

  public static async createByLocal(this: ReturnModelType<typeof UserClass>, username: string, password: string) {
    const { passwordHash, passwordSalt } = await generatePasswordHash(password);
    await this.create({ username, passwordHash, passwordSalt });
  }
}

export const UserModel = getModelForClass(UserClass);
