import { Types } from "mongoose";

export type IRole = "user" | "admin";

export interface IUser {
  _id?: Types.ObjectId | string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date;
  password: string;
  preferences: string[]; // sports, politics, space, etc.
  blockedArticles?: Types.ObjectId[];
  role?: IRole;
  isBlocked?: boolean;
}
