import api from './api';

type StateModel = {
  distributedNetwork: unknown; // TODO: Add distributed network state model
  pendingReconnect: boolean;
  pendingRestart: boolean;
  relay: unknown; // TODO: Add relay state model
  rooms: string[];
  server: ServerStateModel;
  shares: unknown; // TODO: Add shares state model
  user: UserStateModel;
  users: string[];
  version: VersionStateModel;
};

type UserStateModel = {
  privileges: {
    isPrivileged: boolean;
    privilegesRemaining: number;
  };
  statistics: {
    averageSpeed: number;
    directoryCount: number;
    fileCount: number;
    uploadCount: number;
  };
  username: string;
};

type ServerStateModel = {
  address: string;
  ipEndPoint: string;
  isConnected: boolean;
  isLoggedIn: boolean;
  isTransitioning: boolean;
  state: string;
};

type VersionStateModel = {
  current: string;
  full: string;
  isCanary: boolean;
  isDevelopment: boolean;
  isUpdateAvailable?: boolean;
  latest?: string;
};

export const getState = async () => {
  return (await api.get<StateModel>('/application')).data;
};

export const restart = async () => {
  return await api.put<never>('/application');
};

export const shutdown = async () => {
  return await api.delete<never>('/application');
};

export const getVersion = async ({ forceCheck = false }) => {
  return (
    await api.get<VersionStateModel>(
      `/application/version/latest?forceCheck=${forceCheck}`,
    )
  ).data;
};
