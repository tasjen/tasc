import axios from 'axios';
import { getAuthHeader, getToken } from './util';
import { ProjectAPI } from '../types';

const baseUrl = '/api/projects';

async function create(
  projectObject: Omit<ProjectAPI, 'id'>,
): Promise<ProjectAPI> {
  const res = await axios.post(
    baseUrl,
    projectObject,
    getAuthHeader(getToken()),
  );
  return res.data;
}

async function remove(projectId: string): Promise<string> {
  await axios.delete(`${baseUrl}/${projectId}`, getAuthHeader(getToken()));
  return projectId;
}

async function update(projectObject: ProjectAPI): Promise<ProjectAPI> {
  const res = await axios.put(
    `${baseUrl}/${projectObject.id}`,
    projectObject,
    getAuthHeader(getToken()),
  );
  return res.data;
}

export default {
  create,
  remove,
  update,
};
