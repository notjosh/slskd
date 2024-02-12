import api from './api';

export const getInfo = async ({ username }: { username: string }) => {
  return await api.get<unknown>(`/users/${encodeURIComponent(username)}/info`);
};

export const getStatus = async ({ username }: { username: string }) => {
  return await api.get<unknown>(
    `/users/${encodeURIComponent(username)}/status`,
  );
};

export const getEndpoint = async ({ username }: { username: string }) => {
  return await api.get<unknown>(
    `/users/${encodeURIComponent(username)}/endpoint`,
  );
};

export const browse = async ({ username }: { username: string }) => {
  return (
    await api.get<unknown>(`/users/${encodeURIComponent(username)}/browse`)
  ).data;
};

export const getBrowseStatus = async ({ username }: { username: string }) => {
  return await api.get<unknown>(
    `/users/${encodeURIComponent(username)}/browse/status`,
  );
};

export const getDirectoryContents = async ({
  username,
  directory,
}: {
  directory: string;
  username: string;
}) => {
  return (
    await api.post<unknown>(
      `/users/${encodeURIComponent(username)}/directory`,
      {
        directory,
      },
    )
  ).data;
};
