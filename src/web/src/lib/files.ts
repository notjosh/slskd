import api from './api';
import {
  type ApiDownloadsDirectoriesDeleteData,
  type ApiDownloadsDirectoriesDetailData,
  type ApiDownloadsFilesDeleteData,
  type ApiIncompleteDirectoriesDeleteData,
  type ApiIncompleteDirectoriesDetailData,
} from './generated/types';

type Root = 'downloads' | 'incomplete';

export const list = async ({
  root,
  subdirectory = '',
}: {
  root: Root;
  subdirectory: string;
}) => {
  const response = (
    await api.get<
      ApiDownloadsDirectoriesDetailData | ApiIncompleteDirectoriesDetailData
    >(`/files/${root}/directories/${btoa(subdirectory)}`)
  ).data;

  return response;
};

export const deleteDirectory = async ({
  root,
  path,
}: {
  path: string;
  root: Root;
}) => {
  const response = await api.delete<
    ApiDownloadsDirectoriesDeleteData | ApiIncompleteDirectoriesDeleteData
  >(`/files/${root}/directories/${btoa(path)}`);

  return response;
};

export const deleteFile = async ({
  root,
  path,
}: {
  path: string;
  root: Root;
}) => {
  const response = await api.delete<ApiDownloadsFilesDeleteData>(
    `/files/${root}/files/${btoa(path)}`,
  );

  return response;
};
