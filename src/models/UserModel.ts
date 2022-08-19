import { prop, getModelForClass, ReturnModelType, DocumentType } from "@typegoose/typegoose";

import { generateID } from "utils/DBUtils";
import { generatePasswordHash } from "utils/PasswordUtils";

/**
 * Information used for doing join / login / authorization.
 */
export class UserClass {
  @prop()
  _id!: string;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true })
  public passwordHash!: string;

  @prop({ required: true })
  public passwordSalt!: string;

  public static async createNew(this: ReturnModelType<typeof UserClass>, username: string, password: string) {
    const { passwordHash, passwordSalt } = await generatePasswordHash(password);
    return await this.create({ _id: generateID(), username, passwordHash, passwordSalt });
  }

  public static async findByUserID(this: ReturnModelType<typeof UserClass>, userID: string) {
    return await this.findOne({ _id: userID }).exec();
  }

  public static async findByUsername(this: ReturnModelType<typeof UserClass>, username: string) {
    return await this.findOne({ username: username }).exec();
  }
}

export default getModelForClass(UserClass);
