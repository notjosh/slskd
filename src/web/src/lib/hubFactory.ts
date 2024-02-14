import { hubBaseUrl } from '../config';
import {
  type ApiSlskdOptions,
  type ApiSlskdSearchSearch,
  type ApiSlskdState,
} from './generated/types';
import { getToken, isPassthroughEnabled } from './token';
import {
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
} from '@microsoft/signalr';

export const createHubConnection = ({ url }: { url: string }) =>
  new HubConnectionBuilder()
    .withUrl(url, {
      ...(isPassthroughEnabled() ? {} : { accessTokenFactory: getToken }),
      withCredentials: true,
    })
    .withAutomaticReconnect([
      0, 100, 250, 500, 1_000, 2_000, 3_000, 5_000, 5_000, 5_000, 5_000, 5_000,
    ])
    .withHubProtocol(new JsonHubProtocol())
    .configureLogging(LogLevel.Warning)
    .build();

export const createApplicationHubConnection = () =>
  createHubConnection({ url: `${hubBaseUrl}/application` }) as ReturnType<
    typeof createHubConnection
  > & {
    on: ((event: 'state', handler: (state: ApiSlskdState) => void) => void) &
      ((event: 'options', handler: (options: ApiSlskdOptions) => void) => void);
  };

export const createLogsHubConnection = () =>
  createHubConnection({ url: `${hubBaseUrl}/logs` }) as ReturnType<
    typeof createHubConnection
  > & {
    on: ((event: 'buffer', handler: (buffer: HubModelLog[]) => void) => void) &
      ((event: 'log', handler: (record: HubModelLog) => void) => void);
  };

export const createSearchHubConnection = () =>
  createHubConnection({ url: `${hubBaseUrl}/search` }) as ReturnType<
    typeof createHubConnection
  > & {
    on: ((
      event: 'list',
      handler: (searches: ApiSlskdSearchSearch[]) => void,
    ) => void) &
      ((
        event: 'update',
        handler: (search: ApiSlskdSearchSearch) => void,
      ) => void) &
      ((
        event: 'delete',
        handler: (search: ApiSlskdSearchSearch) => void,
      ) => void) &
      ((
        event: 'create',
        handler: (search: ApiSlskdSearchSearch) => void,
      ) => void);
  };

export type HubModelLog = {
  level: 'Debug' | 'Error' | 'Information' | 'Warning';
  message: string;
  timestamp: string;
};
