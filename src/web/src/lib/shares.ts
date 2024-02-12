import api from './api';
import {
  type ApiContentsDetailData,
  type ApiContentsListData,
  type ApiSharesDeleteData,
  type ApiSharesDetailData,
  type ApiSharesListData,
  type ApiSharesUpdateData,
} from './generated/types';

export const getAll = async () => {
  return (await api.get<ApiSharesListData>('/shares')).data;
};

export const get = async ({ id }: { id?: string } = {}) => {
  if (!id) throw new Error('unable to get share: id is missing');
  return (
    await api.get<ApiSharesDetailData>(`/shares/${encodeURIComponent(id)}`)
  ).data;
};

export const browseAll = async () => {
  return (await api.get<ApiContentsListData>('/shares/contents')).data;
};

export const browse = async ({ id }: { id?: string } = {}) => {
  if (!id) throw new Error('unable to get share contents: id is missing');
  return (
    await api.get<ApiContentsDetailData>(
      `/shares/${encodeURIComponent(id)}/contents`,
    )
  ).data;
};

export const rescan = async () => {
  return (await api.put<ApiSharesUpdateData>('/shares')).data;
};

export const cancel = async () => {
  return (await api.delete<ApiSharesDeleteData>('/shares')).data;
};
