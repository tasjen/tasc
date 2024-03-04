import axios from 'axios';
const baseUrl = '/api/login';

type Credentials = {
  username: string;
  password: string;
};

export type LogInResponse = {
  token: string;
  username: string;
};

const login = async (credentials: Credentials): Promise<LogInResponse> => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
