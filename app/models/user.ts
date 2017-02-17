import { Document, Schema, model, PassportLocalDocument, PassportLocalSchema, PassportLocalModel } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export enum UserTypes {
  User,
  Worker,
  Manager,
  Admin
}

export interface IUser extends PassportLocalDocument {
  _id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  title: string,
  address: string,
  userType: UserTypes
}
interface IUserModel<T extends Document> extends PassportLocalModel<T> {}

const userSchema: PassportLocalSchema = new Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  title: String,
  address: String,
  userType: {type: String, enum: ['User', 'Worker', 'Manager', 'Admin']},
  isLocked: Boolean,
  isBanned: Boolean
});

userSchema.plugin(passportLocalMongoose);

export const User : IUserModel<IUser> = model<IUser>('User', userSchema);