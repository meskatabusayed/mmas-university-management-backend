import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean,  default: true },
    role: {
      type: String,
      enum: ["admin", "Student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true } // Enables createdAt & updatedAt fields
);

export const UserModel = model<TUser>("User", userSchema);
