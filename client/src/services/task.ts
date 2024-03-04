import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { NewTask, TaskJson } from '../types';

const baseUrl = '/api/tasks';

async function create(taskObject: NewTask): Promise<TaskJson> {
  const res = await axios.post(baseUrl, taskObject, getAuthHeader(getToken()));
  return res.data;
};

async function remove(taskId: string): Promise<string> {
  await axios.delete(`${baseUrl}/${taskId}`, getAuthHeader(getToken()));
  return taskId
};

async function update(taskObject: TaskJson): Promise<TaskJson> {
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
