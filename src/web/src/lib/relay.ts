import api from './api';

export const connect = async () => {
  return await api.put<unknown>('/relay');
};

export const disconnect = async () => {
  return await api.delete<unknown>('/relay');
};
