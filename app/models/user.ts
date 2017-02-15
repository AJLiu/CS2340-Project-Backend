import { Document, Schema, model, PassportLocalDocument, PassportLocalSchema, PassportLocalModel } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export enum UserTypes {
  Worker,
  Manager,
  Admin
}

export interface IUser extends PassportLocalDocument {
  _id: string,
  uuid: string,
  email: string,
  userType: UserTypes
}
interface IUserModel<T extends Document> extends PassportLocalModel<T> {}

const userSchema: PassportLocalSchema = new Schema({
  uuid: String,
  email: String,
  userType: String
});

userSchema.plugin(passportLocalMongoose);

export const User : IUserModel<IUser> = model<IUser>('User', userSchema);