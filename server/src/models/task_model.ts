import mongoose from 'mongoose';
import Project from './project_model';

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  due_date: {
    type: Date,
  },
  priority: {
    type: Number,
    enum: Priority,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
});

type TaskDoc = mongoose.InferSchemaType<typeof taskSchema>;
export type NewTask = Omit<TaskDoc, 'project'> & { project: string };

taskSchema.pre('save', async function (this, next) {
  if (this.isNew) {
    await Project.findOneAndUpdate(
      { _id: this.project },
      { $push: { tasks: this._id } }
    );
  };
  next();
});

taskSchema.pre('deleteOne', { document: true, query: false }, async function (this, next) {
  await Project.findOneAndUpdate(
    { _id: this.project },
    { $pull: { tasks: this._id } }
  );
  next();
});


type Ret = {
  id?: string;
  _id?: mongoose.Types.ObjectId;
  __v?: number;
};

taskSchema.set('toJSON', {
  transform: (_doc, ret: Ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Task', taskSchema);
