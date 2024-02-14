import { tokenKey, tokenPassthroughValue } from '../config';

// TODO: this is usally gates by `isPassThroughEnabled`, but we'll return a placeholder for now when we don't have a token
export const getToken = () =>
  sessionStorage.getItem(tokenKey) ??
  localStorage.getItem(tokenKey) ??
  '-unknown-';

export const setToken = (storage: Storage, token: string) =>
  storage.setItem(tokenKey, token);

export const clearToken = () => {
  localStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenKey);
};

export const isPassthroughEnabled = () => getToken() === tokenPassthroughValue;
