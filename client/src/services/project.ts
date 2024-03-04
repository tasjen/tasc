import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { ProjectState } from '../types';

const baseUrl = '/api/projects';

async function create(projectObject: { name: string; }): Promise<ProjectState> {
  const res = await axios.post(
    baseUrl,
    projectObject,
    getAuthHeader(getToken())
  );
  delete res.data.user;
  return res.data;
};

async function remove(projectId: string) {
  await axios.delete(`${baseUrl}/${projectId}`, getAuthHeader(getToken()));
  return projectId;
};

async function update(projectObject: { name: string; id: string }) {
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
