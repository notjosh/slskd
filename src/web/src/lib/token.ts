import { tokenKey, tokenPassthroughValue } from '../config';

export const getToken = () => {
  const token =
    sessionStorage.getItem(tokenKey) ?? localStorage.getItem(tokenKey);

  if (token == null) {
    throw new Error('Token not found');
  }

  return token;
};

export const setToken = (storage: Storage, token: string) =>
  storage.setItem(tokenKey, token);

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenKey);
};

export const isPassthroughEnabled = () => getToken() === tokenPassthroughValue;
