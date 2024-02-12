import api from './api';
import {
  type ApiDownloadsAllCompletedDeleteData,
  type ApiDownloadsCreateData,
  type ApiDownloadsDeleteData,
  type ApiDownloadsListData,
  type ApiDownloadsPositionDetailData,
  type ApiQueueDownloadRequest,
  type ApiTransferStates,
  type ApiUploadsAllCompletedDeleteData,
  type ApiUploadsDeleteData,
  type ApiUploadsListData,
} from './generated/types';

export enum TransferDirection {
  Download = 'download',
  Upload = 'upload',
}

export const getAll = async ({
  direction,
}: {
  direction: TransferDirection;
}) => {
  const response = (
    await api.get<ApiDownloadsListData | ApiUploadsListData>(
      `/transfers/${encodeURIComponent(direction)}s`,
    )
  ).data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from transfers API', response);
    return undefined;
  }

  return response;
};

export const download = async ({
  username,
  files = [],
}: {
  files: ApiQueueDownloadRequest[];
  username: string;
}) => {
  return await api.post<ApiDownloadsCreateData>(
    `/transfers/downloads/${encodeURIComponent(username)}`,
    files,
  );
};

export const cancel = async ({
  direction,
  username,
  id,
  remove = false,
}: {
  direction: TransferDirection;
  id: string;
  remove?: boolean;
  username: string;
}) => {
  return await api.delete<ApiDownloadsDeleteData | ApiUploadsDeleteData>(
    `/transfers/${direction}s/${encodeURIComponent(username)}/${encodeURIComponent(id)}?remove=${remove}`,
  );
};

export const clearCompleted = async ({
  direction,
}: {
  direction: TransferDirection;
}) => {
  return await api.delete<
    ApiDownloadsAllCompletedDeleteData | ApiUploadsAllCompletedDeleteData
  >(`/transfers/${direction}s/all/completed`);
};

// 'Requested'
// 'Queued, Remotely'
// 'Queued, Locally'
// 'Initializing'
// 'InProgress'
// 'Completed, Succeeded'
// 'Completed, Cancelled'
// 'Completed, TimedOut'
// 'Completed, Errored'
// 'Completed, Rejected'

// TODO: `ApiTransferStates` doesn't have the reason suffix, only the first word. Is this legacy, or do we need to handle it?

export const getPlaceInQueue = async ({
  username,
  id,
}: {
  id: string;
  username: string;
}) => {
  return await api.get<ApiDownloadsPositionDetailData>(
    `/transfers/downloads/${encodeURIComponent(username)}/${encodeURIComponent(id)}/position`,
  );
};

export const isStateRetryable = (state: ApiTransferStates) =>
  state.includes('Completed') && state !== 'Completed, Succeeded';

export const isStateCancellable = (state: ApiTransferStates) =>
  [
    'InProgress',
    'Requested',
    'Queued',
    'Queued, Remotely',
    'Queued, Locally',
    'Initializing',
  ].find((s) => s === state);

export const isStateRemovable = (state: ApiTransferStates) =>
  state.includes('Completed');
