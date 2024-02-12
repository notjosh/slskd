import api from './api';

export enum TransferDirection {
  Download = 'download',
  Upload = 'upload',
}

export enum TransferState {
  CompletedCancelled = 'Completed, Cancelled',
  CompletedErrored = 'Completed, Errored',
  CompletedRejected = 'Completed, Rejected',
  CompletedSucceeded = 'Completed, Succeeded',
  CompletedTimedOut = 'Completed, TimedOut',
  InProgress = 'InProgress',
  Initializing = 'Initializing',
  QueuedLocally = 'Queued, Locally',
  QueuedRemotely = 'Queued, Remotely',
  Requested = 'Requested',
}

export const getAll = async ({
  direction,
}: {
  direction: TransferDirection;
}) => {
  const response = (
    await api.get<unknown[]>(`/transfers/${encodeURIComponent(direction)}s`)
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
  files: unknown[];
  username: string;
}) => {
  return await api.post<unknown>(
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
  return await api.delete<never>(
    `/transfers/${direction}s/${encodeURIComponent(username)}/${encodeURIComponent(id)}?remove=${remove}`,
  );
};

export const clearCompleted = async ({
  direction,
}: {
  direction: TransferDirection;
}) => {
  return await api.delete<never>(`/transfers/${direction}s/all/completed`);
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

export const getPlaceInQueue = async ({
  username,
  id,
}: {
  id: string;
  username: string;
}) => {
  return await api.get<unknown>(
    `/transfers/downloads/${encodeURIComponent(username)}/${encodeURIComponent(id)}/position`,
  );
};

export const isStateRetryable = (state: TransferState) =>
  state.includes('Completed') && state !== 'Completed, Succeeded';

export const isStateCancellable = (state: TransferState) =>
  [
    'InProgress',
    'Requested',
    'Queued',
    'Queued, Remotely',
    'Queued, Locally',
    'Initializing',
  ].find((s) => s === state);

export const isStateRemovable = (state: TransferState) =>
  state.includes('Completed');
