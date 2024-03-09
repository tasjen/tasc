import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { TaskAPI } from '../types';

const baseUrl = '/api/tasks';

async function create(taskObject: Omit<TaskAPI, 'id'>): Promise<TaskAPI> {
  const res = await axios.post(baseUrl, taskObject, getAuthHeader(getToken()));
  return res.data;
};

async function remove(taskId: string): Promise<string> {
  await axios.delete(`${baseUrl}/${taskId}`, getAuthHeader(getToken()));
  return taskId
};

async function update(taskObject: TaskAPI): Promise<TaskAPI> {
  const res = await axios.put(
    `${baseUrl}/${taskObject.id}`,
    taskObject,
    getAuthHeader(getToken())
  );
  return res.data;
};

export default {
  create,
  remove,
  update,
};
