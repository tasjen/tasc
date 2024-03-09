import axios from 'axios';
import { TUserData } from '../types';
import { getAuthHeader } from './util';

const baseUrl = '/api/users';

async function getUserData(): Promise<TUserData> {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  const res = await axios.get(
    `${baseUrl}/${loggedUser.username}`,
    getAuthHeader(loggedUser.token)
  );
  return res.data;
};

async function register({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<void> {
  await axios.post(baseUrl, { username, password });
};

export default { getUserData, register };
