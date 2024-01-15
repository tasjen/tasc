import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { ProjectState } from '../types';

const baseUrl = '/api/projects';

const create = async (projectObject: {
  name: string;
}): Promise<ProjectState> => {
  const res = await axios.post(
    baseUrl,
    projectObject,
    getAuthHeader(getToken())
  );
  delete res.data.user;
  return res.data;
};

const remove = (projectId: string) => {
  axios.delete(`${baseUrl}/${projectId}`, getAuthHeader(getToken()));
};

const update = async (projectObject: { name: string; id: string }) => {
  const res = await axios.put(
    `${baseUrl}/${projectObject.id}`,
    projectObject,
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
