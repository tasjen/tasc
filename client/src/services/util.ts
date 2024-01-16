import { isAxiosError } from 'axios';

export const getAuthHeader = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getToken = (): string => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  return loggedUser.token
}

export const getUserId = (): string => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  return loggedUser.username
}

export const handleError = (err: unknown) => {
  if (isAxiosError(err) && err.response) {
    console.log(err.response.data.error);
  } else if (err instanceof Error) {
    console.log(err.message);
  }
}