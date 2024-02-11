import { tokenPassthroughValue } from '../config';
import api from './api';
import { clearToken, getToken, setToken } from './token';
import { isAxiosError } from 'axios';

// TODO: generate me, via src/slskd/Core/API/DTO/TokenResponse.cs
type TokenResponse = {
  expires: number;
  issued: number;
  name: string;
  notBefore: number;
  token: string;
  tokenType: string;
};

export const getSecurityEnabled = async () => {
  return (await api.get<boolean>('/session/enabled')).data;
};

export const enablePassthrough = () => {
  console.debug(
    'enabling token passthrough.  api calls will not be authenticated',
  );
  setToken(sessionStorage, tokenPassthroughValue);
};

export const isLoggedIn = () => {
  const token = getToken();
  return token != null && token !== tokenPassthroughValue;
};

export const login = async ({
  username,
  password,
  rememberMe = false,
}: {
  password: string;
  rememberMe: boolean;
  username: string;
}) => {
  const { token } = (
    await api.post<TokenResponse>('/session', { password, username })
  ).data;
  setToken(rememberMe ? localStorage : sessionStorage, token);
  return token;
};

export const logout = () => {
  console.debug('removing token from local and session storage');
  clearToken();
};

export const check = async () => {
  try {
    await api.get<never>('/session');
    return true;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error('session error; not logged in or session has expired');
      logout();
      return false;
    } else {
      throw error;
    }
  }
};
