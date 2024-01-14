/* eslint-disable @typescript-eslint/no-base-to-string */
import mongoose from 'mongoose';
import { NewTask, Priority } from '../utils/types';
import Project, { ProjectDocument } from './project_model';

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

taskSchema.pre('save', async function (this: TaskDocument, next) {
  if (this.isNew) {
    const projectToUpdate = await Project.findById(this.project);
    if (projectToUpdate === null) {
      return next(new Error('taskSchema: projectToUpdate is null'));
    }
    projectToUpdate.tasks = [...projectToUpdate.tasks, this._id];
    void projectToUpdate.save();
  }

  next();
});

taskSchema.pre(
  'deleteOne',
  { document: true, query: false },
  function (this: TaskDocument, next) {
    void Project.findById(this.project).then(
      (projectDoc: ProjectDocument | null) => {
        if (projectDoc) {
          projectDoc.tasks = projectDoc.tasks.filter(
            (t) => t.toString() !== this._id.toString()
          );
          void projectDoc.save();
        }
      }
    );
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
