import api from './api';
import {
  type ApiDownloadsAllCompletedDeleteData,
  type ApiDownloadsCreateData,
  type ApiDownloadsDeleteData,
  type ApiDownloadsListData,
  type ApiDownloadsPositionDetailData,
  type ApiSlskdTransfersAPIQueueDownloadRequest,
  type ApiSoulseekTransferDirection,
  type ApiSoulseekTransferStates,
  type ApiUploadsAllCompletedDeleteData,
  type ApiUploadsDeleteData,
  type ApiUploadsListData,
} from './generated/types';

export const getAll = async ({
  direction,
}: {
  direction: ApiSoulseekTransferDirection;
}) =>
  (
    await api.get<ApiDownloadsListData | ApiUploadsListData>(
      `/transfers/${encodeURIComponent(direction.toLowerCase())}s`,
    )
  ).data;

export const download = async ({
  username,
  files = [],
}: {
  files: ApiSlskdTransfersAPIQueueDownloadRequest[];
  username: string;
}) =>
  await api.post<ApiDownloadsCreateData>(
    `/transfers/downloads/${encodeURIComponent(username)}`,
    files,
  );

export const cancel = async ({
  direction,
  username,
  id,
  remove = false,
}: {
  direction: ApiSoulseekTransferDirection;
  id: string;
  remove?: boolean;
  username: string;
}) =>
  await api.delete<ApiDownloadsDeleteData | ApiUploadsDeleteData>(
    `/transfers/${direction.toLowerCase()}s/${encodeURIComponent(username)}/${encodeURIComponent(id)}?remove=${remove}`,
  );

export const clearCompleted = async ({
  direction,
}: {
  direction: ApiSoulseekTransferDirection;
}) =>
  await api.delete<
    ApiDownloadsAllCompletedDeleteData | ApiUploadsAllCompletedDeleteData
  >(`/transfers/${direction.toLowerCase()}s/all/completed`);

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
}) =>
  await api.get<ApiDownloadsPositionDetailData>(
    `/transfers/downloads/${encodeURIComponent(username)}/${encodeURIComponent(id)}/position`,
  );

export const isStateRetryable = (state: ApiSoulseekTransferStates) =>
  state.includes('Completed') && state !== 'Completed, Succeeded';

export const isStateCancellable = (state: ApiSoulseekTransferStates) =>
  [
    'InProgress',
    'Requested',
    'Queued',
    'Queued, Remotely',
    'Queued, Locally',
    'Initializing',
  ].find((s) => s === state);

export const isStateRemovable = (state: ApiSoulseekTransferStates) =>
  state.includes('Completed');
