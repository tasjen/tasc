import mongoose from 'mongoose';
import { NewProject } from '../utils/types';

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

projectSchema.set('toJSON', {
  transform: (_doc, ret) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model<ProjectDocument>('Project', projectSchema);
