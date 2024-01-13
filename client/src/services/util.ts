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