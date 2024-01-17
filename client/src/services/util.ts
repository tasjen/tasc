import { isAxiosError } from 'axios';

export const getAuthHeader = (token: string) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getToken = (): string => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  return loggedUser.token;
};

export const getUserId = (): string => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  return loggedUser.username;
};

export const handleError = (
  err: unknown,
  setNoti: ({ text, error }: { text: string; error: boolean }) => void
) => {
  if (isAxiosError(err) && err.response) {
    console.log(err.response.data.error);
    setNoti({ text: err.response.data.error, error: true });
  } else if (err instanceof Error) {
    console.log(err.message);
    setNoti({ text: err.message, error: true });
  }
};
