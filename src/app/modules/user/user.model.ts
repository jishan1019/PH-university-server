import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import argon2 from 'argon2';

const userSchema = new Schema<TUser, TUserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    email: { type: String, required: true, unique: true },
    passwordChangeAt: { type: Date },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//pre save middleware // work on save function
userSchema.pre('save', async function (next) {
  try {
    const user = this;
    const hash = await argon2.hash(user.password);
    user.password = hash;

    next();
  } catch (err) {}
});

//post middleware
userSchema.post('save', function (user, next) {
  user.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  console.log(id);

  return await this.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatch = async function (dbUserPass, payloadPass) {
  return await argon2.verify(dbUserPass, payloadPass);
};

userSchema.statics.isJwtIssueBeforePassChange = function (
  passChangeTimestamp: Date,
  jwtIssueTimestamp: number,
) {
  const passChangeTime = new Date(passChangeTimestamp).getTime() / 1000;

  const comparTime = passChangeTime > jwtIssueTimestamp;

  return comparTime;
};

const UserModel = model<TUser, TUserModel>('User', userSchema);

export { UserModel };
