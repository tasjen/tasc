/* eslint-disable @typescript-eslint/no-base-to-string */
import mongoose from 'mongoose';
import { NewTask, Priority } from '../utils/types';
import Project from './project_model';

export interface TaskDocument extends NewTask, mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  __v: number;
}

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    enum: Priority,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

taskSchema.pre('save', function (this: TaskDocument, next) {
  if (this.isNew) {
    void Promise.all([
      Project.findOneAndUpdate(
        { _id: this.project },
        { $push: { tasks: this._id } }
      ),
    ]);
  }

  next();
});

taskSchema.pre(
  'deleteOne',
  { document: true, query: false },
  function (this: TaskDocument, next) {
    void Promise.all([
      Project.findOneAndUpdate(
        { _id: this.project },
        { $pull: { tasks: this._id } }
      ),
    ]);
    next();
  }
);

taskSchema.set('toJSON', {
  transform: (_doc, ret) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<TaskDocument>('Task', taskSchema);
