/* eslint-disable @typescript-eslint/no-base-to-string */
import mongoose from 'mongoose';
import { NewProject } from '../utils/types';
import Task from './task_model';
import User from './user_model';

export interface ProjectDocument
  extends Omit<NewProject, 'tasks'>,
    mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  __v: number;
  tasks: mongoose.Schema.Types.ObjectId[];
}

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
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

projectSchema.pre('save', function (this: ProjectDocument, next) {
  if (this.isNew) {
    void Promise.resolve(
      User.findOneAndUpdate(
        { _id: this.user },
        { $push: { projects: this._id } }
      )
    );
  }

  next();
});

projectSchema.pre(
  'deleteOne',
  { document: true, query: false },
  function (this: ProjectDocument, next) {
    void Promise.all([...this.tasks.map((t) => Task.findByIdAndDelete(t))]);
    void Promise.resolve(
      User.findOneAndUpdate(
        { _id: this.user },
        { $pull: { projects: this._id } }
      )
    );
    next();
  }
);

projectSchema.set('toJSON', {
  transform: (_doc, ret) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<ProjectDocument>('Project', projectSchema);
