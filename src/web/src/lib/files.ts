import api from './api';

type FilesystemFileModel = {
  attributes: string;
  createdAt: string; // iso date
  fullName: string;
  length: number;
  modifiedAt: string; // iso date
  name: string;
};

type FilesystemDirectoryModel = {
  attributes: string;
  createdAt: string; // iso date
  directories: FilesystemDirectoryModel[];
  files: FilesystemFileModel[];
  fullName: string;
  modifiedAt: string; // iso date
  name: string;
};

export const list = async ({
  root,
  subdirectory = '',
}: {
  root: string;
  subdirectory: string;
}) => {
  const response = (
    await api.get<FilesystemDirectoryModel>(
      `/files/${root}/directories/${btoa(subdirectory)}`,
    )
  ).data;

  return response;
};

export const deleteDirectory = async ({
  root,
  path,
}: {
  path: string;
  root: string;
}) => {
  const response = await api.delete<never>(
    `/files/${root}/directories/${btoa(path)}`,
  );

  return response;
};

export const deleteFile = async ({
  root,
  path,
}: {
  path: string;
  root: string;
}) => {
  const response = await api.delete<never>(
    `/files/${root}/files/${btoa(path)}`,
  );

  return response;
};
