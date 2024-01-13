import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { NewUser } from '../utils/types';
import bcrypt from 'bcrypt';
import Project from './project_model';

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
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
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

  //hash password before saving
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  
  // Add default project
  const defaultProject = new Project({name: 'Default', user: this._id});
  await defaultProject.save();
  this.projects = [defaultProject._id];

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
