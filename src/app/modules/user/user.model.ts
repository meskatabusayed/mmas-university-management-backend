import { Schema, model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'Student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default : "in-progress",
      required: true,
    },
    isDeleted: { type: Boolean,  default: false },
  },
  { timestamps: true } // Enables createdAt & updatedAt fields
);


userSchema.pre('save', async function (next) {
  
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solt_rounds)
  );
  next();
});


userSchema.post('save', function (doc, next) {
  
  doc.password = ' ';
  next();
});


export const User = model<TUser>('User', userSchema);
