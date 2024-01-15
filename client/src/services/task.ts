import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { NewTask, TaskJson } from '../types';

const baseUrl = '/api/tasks';

const create = async (taskObject: NewTask) => {
  const res = await axios.post(baseUrl, taskObject, getAuthHeader(getToken()));
  delete res.data.project;
  return res.data;
};

const remove = async (taskId: string) => {
  await axios.delete(`${baseUrl}/${taskId}`, getAuthHeader(getToken()));
};

const update = async (taskObject: TaskJson) => {
  const res = await axios.put(
    `${baseUrl}/${taskObject.id}`,
    taskObject,
    getAuthHeader(getToken())
  );
  delete res.data.project;
  return res.data;
};

export default {
  create,
  remove,
  update,
};
