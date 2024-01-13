import axios from 'axios';
import { UserJson } from '../types';
import { getAuthHeader } from './util';

const baseUrl = '/api/users';

const getUserData = async (): Promise<UserJson> => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  const res = await axios.get(
    `${baseUrl}/${loggedUser.username}`,
    getAuthHeader(loggedUser.token)
  );
  return res.data;
};

export default { getUserData };
