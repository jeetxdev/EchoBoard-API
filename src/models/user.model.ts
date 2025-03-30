import mongoose, { Document } from "mongoose";

export type UserType = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  deleted: boolean;
};

const UserSchema = new mongoose.Schema<UserType>(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<UserType>("User", UserSchema);
