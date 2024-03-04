export function getAuthHeader(token: string) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export function getToken(): string {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  return loggedUser.token;
};

export function getUserId(): string {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
  return loggedUser.username;
};
