import mongoose from 'mongoose';
import Task from './task_model';
import User from './user_model';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

type ProjectDoc = mongoose.InferSchemaType<typeof projectSchema>;
export type NewProject = Omit<ProjectDoc, 'user'> & { user: string };

projectSchema.pre('save', async function (this, next) {
  if (this.isNew) {
    await User.findOneAndUpdate(
      { _id: this.user },
      { $push: { projects: this._id } }
    );
  }
  next();
});

projectSchema.pre('deleteOne', { document: true, query: false }, async function (this, next) {
  await Promise.all([...this.tasks.map((t) => Task.findByIdAndDelete(t))]);
  await User.findOneAndUpdate(
    { _id: this.user },
    { $pull: { projects: this._id } }
  );
  next();
});

type Ret = {
  id?: string;
  _id?: mongoose.Types.ObjectId;
  __v?: number;
};

projectSchema.set('toJSON', {
  transform: (_doc, ret: Ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Project', projectSchema);
