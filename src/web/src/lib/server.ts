import api from './api';
import {
  type ApiServerDeleteData,
  type ApiServerListData,
  type ApiServerUpdateData,
} from './generated/types';

export const getState = async () => {
  return (await api.get<ApiServerListData>('/server')).data;
};

export const connect = async () => {
  return await api.put<ApiServerUpdateData>('/server');
};

export const disconnect = async ({
  message = 'client disconnected from web UI',
} = {}) => {
  return await api.delete<ApiServerDeleteData>('/server', {
    data: JSON.stringify(message),
  });
};
