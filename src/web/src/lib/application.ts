import api from './api';
import {
  type ApiApplicationDeleteData,
  type ApiApplicationListData,
  type ApiApplicationUpdateData,
  type ApiVersionLatestListData,
} from './generated/types';

export const getState = async () => {
  return (await api.get<ApiApplicationListData>('/application')).data;
};

export const restart = async () => {
  return await api.put<ApiApplicationUpdateData>('/application');
};

export const shutdown = async () => {
  return await api.delete<ApiApplicationDeleteData>('/application');
};

export const getVersion = async ({ forceCheck = false }) => {
  return (
    await api.get<ApiVersionLatestListData>(
      `/application/version/latest?forceCheck=${forceCheck}`,
    )
  ).data;
};
