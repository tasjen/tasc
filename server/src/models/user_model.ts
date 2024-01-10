import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { NewUser } from '../types';
import bcrypt from 'bcrypt';

export interface UserDocument extends Omit<NewUser, 'projects'>, mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  __v: number;
  projects: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

export default mongoose.model<UserDocument>('User', userSchema);
