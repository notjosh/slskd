import api from './api';

// TODO: missing endpoint?
export const connect = async () => {
  return await api.put<unknown>('/relay');
};

// TODO: missing endpoint?
export const disconnect = async () => {
  return await api.delete<unknown>('/relay');
};
