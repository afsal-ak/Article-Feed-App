import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "../../domain/entities/IUser";

export interface IUserDocument extends Omit<IUser, "_id">, Document {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String], // sports, politics, space etc.
      default: [],
    },
    blockedArticles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "Users",
  UserSchema
);
