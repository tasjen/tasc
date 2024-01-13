import axios from 'axios';
import { getAuthHeader, getToken } from './util';

const baseUrl = '/api/projects';

const create = async (projectObject: { name: string }) => {
  const res = await axios.post(
    baseUrl,
    projectObject,
    getAuthHeader(getToken())
  );
  delete res.data.user;
  return res.data;
};

export default {
  create,
};
