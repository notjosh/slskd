import api from './api';

export const getAll = async () => {
  return (await api.get<unknown>('/conversations')).data;
};

export const get = async ({ username }: { username: string }) => {
  return (
    await api.get<unknown>(`/conversations/${encodeURIComponent(username)}`)
  ).data;
};

export const acknowledge = async ({ username }: { username: string }) => {
  return await api.put<unknown>(
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
  return await api.post<unknown>(
    `/conversations/${encodeURIComponent(username)}`,
    JSON.stringify(message),
  );
};

export const remove = async ({ username }: { username: string }) => {
  return await api.delete<unknown>(
    `/conversations/${encodeURIComponent(username)}`,
  );
};
