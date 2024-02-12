import api from './api';
import {
  type ApiConversationsCreateData,
  type ApiConversationsDeleteData,
  type ApiConversationsDetailData,
  type ApiConversationsListData,
  type ApiConversationsUpdateData,
} from './generated/types';

export const getAll = async () => {
  return (await api.get<ApiConversationsListData>('/conversations')).data;
};

export const get = async ({ username }: { username: string }) => {
  return (
    await api.get<ApiConversationsDetailData>(
      `/conversations/${encodeURIComponent(username)}`,
    )
  ).data;
};

export const acknowledge = async ({ username }: { username: string }) => {
  return await api.put<ApiConversationsUpdateData>(
    `/conversations/${encodeURIComponent(username)}`,
  );
};

export const send = async ({
  username,
  message,
}: {
  message: string;
  username: string;
}) => {
  return await api.post<ApiConversationsCreateData>(
    `/conversations/${encodeURIComponent(username)}`,
    JSON.stringify(message),
  );
};

export const remove = async ({ username }: { username: string }) => {
  return await api.delete<ApiConversationsDeleteData>(
    `/conversations/${encodeURIComponent(username)}`,
  );
};
