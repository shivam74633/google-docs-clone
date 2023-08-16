import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface User extends mongoose.Document {
  email: string;
  name?: string;
  socialId?: string;
  socialAccount?: string;
  imageUrl?: string;
  password?: string;
  comparePassword?: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  socialId: { type: String },
  socialAccount: { type: String },
  imageUrl: { type: String },
  password: { type: String },
});

UserSchema.pre("save", async function (next) {
  const user = this as User;

  if (!user.isModified("password") || !user.password) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password as string);
};

export const User = mongoose.model<User>("User", UserSchema, "users");
