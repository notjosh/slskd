import api from './api';

// TODO: generate, via src/slskd/Shares/Types/Share.cs
type ShareResponseModel = {
  alias: string;
  directories: number | null;
  files: number | null;
  id: string;
  isExcluded: boolean;
  localPath: string;
  raw: string;
  remotePath: string;
};

// ProducesResponseType(typeof(Dictionary<string, IEnumerable<Share>>), 200)
type SharesListResponse = Record<string, ShareResponseModel[]>;

// TODO: generate, via slsk.net?
type FileModel = {
  attributeCount: number;
  attributes: Array<{ name: string; value: number | string }>;
  bitRate: number;
  code: number;
  extension: string;
  filename: string;
  isVariableBitRate: boolean;
  length: number;
  size: number;
};

// TODO: generate, via slsk.net?
type DirectoryModel = {
  fileCount: number;
  files: FileModel[];
  // directory separator is `\\` in the response
  name: string;
};

export const getAll = async () => {
  return (await api.get<SharesListResponse>('/shares')).data;
};

export const get = async ({ id }: { id?: string } = {}) => {
  if (!id) throw new Error('unable to get share: id is missing');
  return (
    await api.get<ShareResponseModel>(`/shares/${encodeURIComponent(id)}`)
  ).data;
};

export const browseAll = async () => {
  return (await api.get<DirectoryModel[]>('/shares/contents')).data;
};

export const browse = async ({ id }: { id?: string } = {}) => {
  if (!id) throw new Error('unable to get share contents: id is missing');
  return (
    await api.get<DirectoryModel[]>(
      `/shares/${encodeURIComponent(id)}/contents`,
    )
  ).data;
};

export const rescan = async () => {
  return (await api.put<never>('/shares')).data;
};

export const cancel = async () => {
  return (await api.delete<never>('/shares')).data;
};
