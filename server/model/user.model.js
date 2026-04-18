import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    profilePic: { type: String },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 });

export const UserModel = mongoose.model("USER", UserSchema);
