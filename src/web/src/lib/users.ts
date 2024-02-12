import api from './api';
import {
  type ApiBrowseDetailData,
  type ApiBrowseStatusDetailData,
  type ApiDirectoryContentsRequest,
  type ApiDirectoryCreateData,
  type ApiEndpointDetailData,
  type ApiInfoDetailData,
  type ApiStatusDetailData,
} from './generated/types';

export const getInfo = async ({ username }: { username: string }) => {
  return await api.get<ApiInfoDetailData>(
    `/users/${encodeURIComponent(username)}/info`,
  );
};

export const getStatus = async ({ username }: { username: string }) => {
  return await api.get<ApiStatusDetailData>(
    `/users/${encodeURIComponent(username)}/status`,
  );
};

export const getEndpoint = async ({ username }: { username: string }) => {
  return await api.get<ApiEndpointDetailData>(
    `/users/${encodeURIComponent(username)}/endpoint`,
  );
};

export const browse = async ({ username }: { username: string }) => {
  return (
    await api.get<ApiBrowseDetailData>(
      `/users/${encodeURIComponent(username)}/browse`,
    )
  ).data;
};

export const getBrowseStatus = async ({ username }: { username: string }) => {
  return await api.get<ApiBrowseStatusDetailData>(
    `/users/${encodeURIComponent(username)}/browse/status`,
  );
};

export const getDirectoryContents = async ({
  username,
  directory,
}: {
  directory: ApiDirectoryContentsRequest['directory'];
  username: string;
}) => {
  return (
    await api.post<ApiDirectoryCreateData>(
      `/users/${encodeURIComponent(username)}/directory`,
      {
        directory,
      },
    )
  ).data;
};
