import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { NewTask, TaskJson } from '../types';

const baseUrl = '/api/tasks';

const create = async (taskObject: NewTask): Promise<TaskJson> => {
  const res = await axios.post(baseUrl, taskObject, getAuthHeader(getToken()));
  return res.data;
};

const remove = async (taskId: string): Promise<string> => {
  await axios.delete(`${baseUrl}/${taskId}`, getAuthHeader(getToken()));
  return taskId
};

const update = async (taskObject: TaskJson): Promise<TaskJson> => {
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
