import api from './api';

export const getState = async () => {
  return (await api.get<unknown>('/server')).data;
};

export const connect = async () => {
  return await api.put<unknown>('/server');
};

export const disconnect = async ({
  message = 'client disconnected from web UI',
} = {}) => {
  return await api.delete<unknown>('/server', {
    data: JSON.stringify(message),
  });
};
