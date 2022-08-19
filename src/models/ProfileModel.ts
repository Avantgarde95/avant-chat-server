import { prop, getModelForClass, DocumentType, ReturnModelType } from "@typegoose/typegoose";

import { generateID } from "utils/DBUtils";

/**
 * Detailed information of each user.
 */
export class ProfileClass {
  @prop()
  _id!: string;

  @prop({ required: true })
  userID!: string;

  @prop()
  public avatarURL!: string;

  @prop()
  public description!: string;

  public static async createNew(this: ReturnModelType<typeof ProfileClass>, userID: string) {
    return await this.create({ _id: generateID(), userID, avatarURL: "", description: "" });
  }

  public static async findByUserID(this: ReturnModelType<typeof ProfileClass>, userID: string) {
    return await this.findOne({ userID }).exec();
  }

  public async updateValues(this: DocumentType<ProfileClass>, avatarURL: string, description: string) {
    return await this.updateOne({ avatarURL, description }).exec();
  }
}

export default getModelForClass(ProfileClass);
