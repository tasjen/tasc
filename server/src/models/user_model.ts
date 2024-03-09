import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Project from './project_model';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
      required: true
    },
  ],
});

type UserDoc = mongoose.InferSchemaType<typeof userSchema>;
export type NewUser = Omit<UserDoc, 'projects'> & { projects: string[] };

userSchema.pre('save', async function (this, next) {
  if (!this.isModified('password')) {
    return next();
  }

  //hash password before saving
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  // Add default project
  const defaultProject = new Project({ name: 'Default', user: this._id });
  await defaultProject.save();
  this.projects = [defaultProject._id];

  next();
});

type Ret = {
  id?: string;
  _id?: mongoose.Types.ObjectId;
  __v?: number;
  password?: string
};

userSchema.set('toJSON', {
  transform: (_doc, ret: Ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

export default mongoose.model('User', userSchema);
