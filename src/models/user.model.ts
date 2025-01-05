import mongoose, { Document, Schema } from "mongoose";

import { v4 as uuidv4 } from "uuid";

const bcrypt = require("bcrypt");

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  apiKey: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apiKey: { type: String, default: uuidv4?.() },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  // Ensure `this` is correctly typed
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
