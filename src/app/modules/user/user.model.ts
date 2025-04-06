import { Schema, model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'Student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
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

userSchema.statics.isUserExisByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp
) {
  if (!passwordChangedTimestamp) return false;

  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
