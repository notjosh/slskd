/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type ApiAgentDeleteData = unknown;

export type ApiAgentUpdateData = unknown;

export type ApiApplicationDeleteData = unknown;

export type ApiApplicationListData = ApiSlskdState;

export type ApiApplicationUpdateData = unknown;

export type ApiAvailableListData = ApiSlskdMessagingAPIRoomInfoResponse[];

export type ApiBrowseDetailData = ApiSoulseekBrowseResponse;

export type ApiBrowseDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

/** @format double */
export type ApiBrowseStatusDetailData = number;

export type ApiBrowseStatusDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiContentsDetailData = ApiSoulseekDirectory[];

export type ApiContentsDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiContentsListData = ApiSoulseekDirectory[];

export type ApiControllerDownloadsDetailData = unknown;

export type ApiControllerFilesCreateData = unknown;

export type ApiControllerSharesCreateData = unknown;

export type ApiConversationsCreateData = unknown;

export type ApiConversationsCreateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiConversationsDeleteData = unknown;

export type ApiConversationsDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiConversationsDetailData = ApiSlskdMessagingConversation;

export type ApiConversationsDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiConversationsListData = ApiSlskdMessagingConversation[];

export type ApiConversationsUpdate2Data = unknown;

export type ApiConversationsUpdate2Error = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiConversationsUpdateData = unknown;

export type ApiConversationsUpdateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDebugListData = string;

export type ApiDirectoryCreateData = ApiSoulseekDirectory;

export type ApiDirectoryCreateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDownloadsAllCompletedDeleteData = unknown;

export type ApiDownloadsCreateData = unknown;

export type ApiDownloadsCreateError = string;

export type ApiDownloadsDeleteData = unknown;

export type ApiDownloadsDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDownloadsDetail2Data = ApiSlskdTransfersAPIUserResponse;

export type ApiDownloadsDetailData = ApiSlskdTransfersAPITransfer;

export type ApiDownloadsDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDownloadsDirectoriesDeleteData = unknown;

export type ApiDownloadsDirectoriesDetailData = ApiSlskdFilesFilesystemDirectory;

export type ApiDownloadsDirectoriesDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDownloadsDirectoriesListData = ApiSlskdFilesFilesystemDirectory;

export type ApiDownloadsDirectoriesListError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDownloadsFilesDeleteData = unknown;

export type ApiDownloadsListData = ApiSlskdTransfersAPIUserResponse[];

export type ApiDownloadsPositionDetailData = ApiSlskdTransfersAPITransfer;

export type ApiDownloadsPositionDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiDumpListData = unknown;

export type ApiEnabledListData = boolean;

export type ApiEndpointDetailData = ApiSystemNetIPEndPoint;

export type ApiEndpointDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiIncompleteDirectoriesDeleteData = unknown;

export type ApiIncompleteDirectoriesDetailData = ApiSlskdFilesFilesystemDirectory;

export type ApiIncompleteDirectoriesListData = ApiSlskdFilesFilesystemDirectory;

export type ApiIncompleteFilesDeleteData = unknown;

export type ApiInfoDetailData = ApiSlskdUsersInfo;

export type ApiInfoDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedCreateData = ApiSlskdMessagingAPIRoomResponse;

export type ApiJoinedDeleteData = unknown;

export type ApiJoinedDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedDetailData = ApiSlskdMessagingAPIRoomResponse;

export type ApiJoinedDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedListData = string[];

export type ApiJoinedMembersCreateData = unknown;

export type ApiJoinedMembersCreateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedMessagesCreateData = unknown;

export type ApiJoinedMessagesCreateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedMessagesDetailData = ApiSlskdMessagingAPIRoomMessageResponse[];

export type ApiJoinedMessagesDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedTickerCreateData = unknown;

export type ApiJoinedTickerCreateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiJoinedUsersDetailData = ApiSlskdMessagingAPIUserDataResponse[];

export type ApiJoinedUsersDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiLogsListData = unknown;

export type ApiMessagesDetailData = ApiSlskdMessagingPrivateMessage[];

export type ApiMessagesDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiMetricsListData = unknown;

export interface ApiMicrosoftAspNetCoreMvcProblemDetails {
  detail?: string | null;
  instance?: string | null;
  /** @format int32 */
  status?: number | null;
  title?: string | null;
  type?: string | null;
  [key: string]: unknown;
}

export type ApiOptionsListData = ApiSlskdOptions;

export type ApiPostApplicationData = unknown;

export type ApiPublicchatCreateData = unknown;

export type ApiPublicchatDeleteData = unknown;

export type ApiResponsesDetailData = ApiSlskdSearchResponse[];

export type ApiSearchesCreateData = ApiSlskdSearchSearch;

export type ApiSearchesDeleteData = unknown;

export type ApiSearchesDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiSearchesDetailData = ApiSlskdSearchSearch;

export type ApiSearchesListData = ApiSlskdSearchSearch[];

export type ApiSearchesUpdateData = unknown;

export type ApiServerDeleteData = unknown;

export type ApiServerDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiServerListData = ApiSlskdCoreAPIServerState;

export type ApiServerListError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiServerUpdateData = unknown;

export type ApiServerUpdateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiSessionCreateData = ApiSlskdCoreAPITokenResponse;

export type ApiSessionCreateError = ApiMicrosoftAspNetCoreMvcProblemDetails | string;

export type ApiSessionListData = unknown;

export type ApiSessionListError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiSharesDeleteData = unknown;

export type ApiSharesDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiSharesDetailData = ApiSlskdSharesShare;

export type ApiSharesDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiSharesListData = Record<string, ApiSlskdSharesShare[]>;

export type ApiSharesUpdateData = unknown;

export type ApiSharesUpdateError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export interface ApiSlskdCoreAPILoginRequest {
  password: string;
  username: string;
}

export interface ApiSlskdCoreAPIServerState {
  address: string;
  ipEndPoint: ApiSystemNetIPEndPoint;
  readonly isConnected: boolean;
  readonly isLoggedIn: boolean;
  readonly isTransitioning: boolean;
  state: ApiSoulseekSoulseekClientStates;
  username: string;
}

export interface ApiSlskdCoreAPITokenResponse {
  /**
   * Gets the time at which the Access Token expires.
   * @format int64
   */
  readonly expires: number;
  /**
   * Gets the time at which the Access Token was issued.
   * @format int64
   */
  readonly issued: number;
  /** Gets the value of the Name claim from the Access Token. */
  readonly name: string;
  /**
   * Gets the value of the Not Before claim from the Access Token.
   * @format int64
   */
  readonly notBefore: number;
  /** Gets the Access Token string. */
  readonly token: string;
  /** Gets the Token type. */
  readonly tokenType: string;
}

export interface ApiSlskdDistributedNetworkState {
  /** @format int32 */
  branchLevel: number;
  branchRoot: string;
  canAcceptChildren: boolean;
  /** @format int32 */
  childLimit: number;
  children: string[];
  hasParent: boolean;
  isBranchRoot: boolean;
  parent: string;
}

/** A file directory on the host filesystem. */
export interface ApiSlskdFilesFilesystemDirectory {
  attributes: ApiSystemIOFileAttributes;
  /**
   * The timestamp at which the directory was created.
   * @format date-time
   */
  createdAt: string;
  /** The directories within the directory. */
  directories: ApiSlskdFilesFilesystemDirectory[];
  /** The files within the directory. */
  files: ApiSlskdFilesFilesystemFile[];
  /** The fully qualified name of the directory. */
  fullName: string;
  /**
   * The timestamp at which the directory was last modified.
   * @format date-time
   */
  modifiedAt: string;
  /** The name of the directory. */
  name: string;
}

/** A file on the host filesystem. */
export interface ApiSlskdFilesFilesystemFile {
  attributes: ApiSystemIOFileAttributes;
  /**
   * The timestamp at which the file was created.
   * @format date-time
   */
  createdAt: string;
  /** The fully qualified name of the file. */
  fullName: string;
  /**
   * The size of the file, in bytes.
   * @format int64
   */
  length: number;
  /**
   * The timestamp at which the file was last modified.
   * @format date-time
   */
  modifiedAt: string;
  /** The name of the file. */
  name: string;
}

export interface ApiSlskdMessagingAPIRoomInfoResponse {
  /** Gets a value indicating whether the room is moderated by the currently logged in user. */
  isModerated: boolean;
  /** Gets a value indicating whether the room is owned by the currently logged in user. */
  isOwned: boolean;
  /** Gets a value indicating whether the room is private. */
  isPrivate: boolean;
  /** Gets the room name. */
  name: string;
  /**
   * Gets the number of users in the room.
   * @format int32
   */
  userCount: number;
}

export interface ApiSlskdMessagingAPIRoomMessageResponse {
  /** The message. */
  message: string;
  /** The room to which the message pertains. */
  roomName: string;
  /** A value indicating whether this user data belongs to the currently logged in user. */
  self?: boolean | null;
  /**
   * The timestamp of the message.
   * @format date-time
   */
  timestamp: string;
  /** The username of the user who sent the message. */
  username: string;
}

export interface ApiSlskdMessagingAPIRoomResponse {
  /** A value indicating whether the room is private. */
  isPrivate: boolean;
  /** The list of messages. */
  messages: ApiSlskdMessagingAPIRoomMessageResponse[];
  /** The room name. */
  name: string;
  /**
   * The number of operators in the room, if private.
   * @format int32
   */
  operatorCount?: number | null;
  /** The operators in the room, if private. */
  operators: string[];
  /** The owner of the room, if private. */
  owner: string;
  /** The list of users in the room. */
  users: ApiSlskdMessagingAPIUserDataResponse[];
}

export interface ApiSlskdMessagingAPIUserDataResponse {
  /**
   * The average upload speed of the user.
   * @format int32
   */
  averageSpeed: number;
  /** The user's country code, if provided. */
  countryCode: string;
  /**
   * The number of directories shared by the user.
   * @format int32
   */
  directoryCount: number;
  /**
   * The number of files shared by the user.
   * @format int32
   */
  fileCount: number;
  /** A value indicating whether this user data belongs to the currently logged in user. */
  self?: boolean | null;
  /**
   * The number of the user's free download slots, if provided.
   * @format int32
   */
  slotsFree?: number | null;
  status: ApiSoulseekUserPresence;
  /**
   * The number of uploads tracked by the server for the user.
   * @format int64
   */
  uploadCount: number;
  /** The username of the user. */
  username: string;
}

export interface ApiSlskdMessagingConversation {
  readonly hasUnAcknowledgedMessages: boolean;
  isActive: boolean;
  messages: ApiSlskdMessagingPrivateMessage[];
  /** @format int32 */
  unAcknowledgedMessageCount: number;
  username: string;
}

export enum ApiSlskdMessagingMessageDirection {
  Out = "Out",
  In = "In",
}

/** A private message. */
export interface ApiSlskdMessagingPrivateMessage {
  direction: ApiSlskdMessagingMessageDirection;
  /**
   * The unique message id, used to acknowledge receipt.
   * @format int32
   */
  id: number;
  /** A value indicating whether the message has been acknowledged. */
  isAcknowledged: boolean;
  /** The message. */
  message: string;
  /**
   * The UTC timestamp of the message.
   * @format date-time
   */
  timestamp: string;
  /** The username of the remote user. */
  username: string;
}

/** Application options. */
export interface ApiSlskdOptions {
  /** Gets a value indicating whether the application should run in debug mode. */
  debug: boolean;
  /** Directory options. */
  directories: ApiSlskdOptionsDirectoriesOptions;
  /** Feature options. */
  feature: ApiSlskdOptionsFeatureOptions;
  /** Filter options. */
  filters: ApiSlskdOptionsFiltersOptions;
  /** Optional flags. */
  flags: ApiSlskdOptionsFlagsOptions;
  /** Global options. */
  global: ApiSlskdOptionsGlobalOptions;
  /** User groups. */
  groups: ApiSlskdOptionsGroupsOptions;
  /** Gets the unique name for this instance. */
  instanceName: string;
  /** Options for external integrations. */
  integration: ApiSlskdOptionsIntegrationOptions;
  /** Logger options. */
  logger: ApiSlskdOptionsLoggerOptions;
  /** Metrics options. */
  metrics: ApiSlskdOptionsMetricsOptions;
  /** Relay options. */
  relay: ApiSlskdOptionsRelayOptions;
  /** Gets a value indicating whether remote configuration of options is allowed. */
  remoteConfiguration: boolean;
  /** Gets a value indicating whether remote file management is allowed. */
  remoteFileManagement: boolean;
  /** Retention options. */
  retention: ApiSlskdOptionsRetentionOptions;
  /** Gets a list of rooms to automatically join upon connection. */
  rooms: string[];
  /** Share options. */
  shares: ApiSlskdOptionsSharesOptions;
  /** Soulseek client options. */
  soulseek: ApiSlskdOptionsSoulseekOptions;
  /** Web server options. */
  web: ApiSlskdOptionsWebOptions;
}

/** Directory options. */
export interface ApiSlskdOptionsDirectoriesOptions {
  /** Gets the path where downloaded files are saved. */
  downloads: string;
  /** Gets the path where incomplete downloads are saved. */
  incomplete: string;
}

/** Feature options. */
export interface ApiSlskdOptionsFeatureOptions {
  /** Gets a value indicating whether swagger documentation and UI should be enabled. */
  swagger: boolean;
}

/** Filter options. */
export interface ApiSlskdOptionsFiltersOptions {
  /** Search filter options. */
  search: ApiSlskdOptionsFiltersOptionsSearchOptions;
}

/** Search filter options. */
export interface ApiSlskdOptionsFiltersOptionsSearchOptions {
  /** Gets the list of search request filters. */
  request?: string[] | null;
}

/** Optional flags. */
export interface ApiSlskdOptionsFlagsOptions {
  /** Gets a value indicating whether user-defined regular expressions are case sensitive. */
  caseSensitiveRegEx: boolean;
  /** Gets a value indicating whether the application should run in experimental mode. */
  experimental: boolean;
  /** Gets a value indicating whether shares should be forcibly re-scanned on startup. */
  forceShareScan: boolean;
  /** Gets a value indicating whether Entity Framework queries should be logged. */
  logSQL: boolean;
  /** Gets a value indicating whether the application should watch the configuration file for changes. */
  noConfigWatch: boolean;
  /** Gets a value indicating whether the application should connect to the Soulseek network on startup. */
  noConnect: boolean;
  /** Gets a value indicating whether the logo should be suppressed on startup. */
  noLogo: boolean;
  /** Gets a value indicating whether the application should scan shared directories on startup. */
  noShareScan: boolean;
  /** Gets a value indicating whether the application should quit after initialization. */
  noStart: boolean;
  /** Gets a value indicating whether the application should check for a newer version on startup. */
  noVersionCheck: boolean;
  /** Gets a value indicating whether the application should run in volatile mode. */
  volatile: boolean;
}

/** Global options. */
export interface ApiSlskdOptionsGlobalOptions {
  /** Gets global download options. */
  download: ApiSlskdOptionsGlobalOptionsGlobalDownloadOptions;
  /** Global upload options. */
  upload: ApiSlskdOptionsGlobalOptionsGlobalUploadOptions;
}

/** Gets global download options. */
export interface ApiSlskdOptionsGlobalOptionsGlobalDownloadOptions {
  /**
   * Gets the limit for the total number of download slots.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  slots: number;
  /**
   * Gets the total download speed limit.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  speedLimit: number;
}

/** Global upload options. */
export interface ApiSlskdOptionsGlobalOptionsGlobalUploadOptions {
  /**
   * Gets the limit for the total number of upload slots.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  slots: number;
  /**
   * Gets the total upload speed limit.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  speedLimit: number;
}

/** User groups. */
export interface ApiSlskdOptionsGroupsOptions {
  /** Built in blacklisted group options. */
  blacklisted: ApiSlskdOptionsGroupsOptionsBlacklistedOptions;
  /** Built in user group options. */
  default: ApiSlskdOptionsGroupsOptionsBuiltInOptions;
  /** Built in leecher group options. */
  leechers: ApiSlskdOptionsGroupsOptionsLeecherOptions;
  /** Gets user defined groups and options. */
  userDefined: Record<string, ApiSlskdOptionsGroupsOptionsUserDefinedOptions>;
}

/** Built in blacklisted group options. */
export interface ApiSlskdOptionsGroupsOptionsBlacklistedOptions {
  /** Gets the list of group CIDRs. */
  cidrs?: string[] | null;
  /** Gets the list of group member usernames. */
  members?: string[] | null;
}

/** Built in user group options. */
export interface ApiSlskdOptionsGroupsOptionsBuiltInOptions {
  /** Upload limit options. */
  limits?: ApiSlskdOptionsGroupsOptionsLimitsOptions;
  /** User group upload options. */
  upload?: ApiSlskdOptionsGroupsOptionsUploadOptions;
}

/** Built in leecher group options. */
export interface ApiSlskdOptionsGroupsOptionsLeecherOptions {
  /** Upload limit options. */
  limits?: ApiSlskdOptionsGroupsOptionsLimitsOptions;
  /** Leecher threshold options. */
  thresholds?: ApiSlskdOptionsGroupsOptionsThresholdOptions;
  /** User group upload options. */
  upload?: ApiSlskdOptionsGroupsOptionsUploadOptions;
}

/** Extended limit options. */
export interface ApiSlskdOptionsGroupsOptionsLimitsExtendedOptions {
  /**
   * Gets the limit for number of failures.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  failures?: number | null;
  /**
   * Gets the limit for number of files.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  files?: number | null;
  /**
   * Gets the limit for number of megabytes.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  megabytes?: number | null;
}

/** Upload limit options. */
export interface ApiSlskdOptionsGroupsOptionsLimitsOptions {
  /** Extended limit options. */
  daily?: ApiSlskdOptionsGroupsOptionsLimitsExtendedOptions;
  /** Extended limit options. */
  queued?: ApiSlskdOptionsGroupsOptionsLimitsExtendedOptions;
  /** Extended limit options. */
  weekly?: ApiSlskdOptionsGroupsOptionsLimitsExtendedOptions;
}

/** Leecher threshold options. */
export interface ApiSlskdOptionsGroupsOptionsThresholdOptions {
  /**
   * Gets the minimum number of shared directories required to avoid being classified as a leecher.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  directories: number;
  /**
   * Gets the minimum number of shared files required to avoid being classified as a leecher.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  files: number;
}

/** User group upload options. */
export interface ApiSlskdOptionsGroupsOptionsUploadOptions {
  /**
   * Gets the priority of the group.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  priority: number;
  /**
   * Gets the limit for the total number of upload slots for the group.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  slots: number;
  /**
   * Gets the total upload speed limit for the group.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  speedLimit: number;
  /** Gets the queue strategy for the group. */
  strategy?: string | null;
}

/** User defined user group options. */
export interface ApiSlskdOptionsGroupsOptionsUserDefinedOptions {
  /** Upload limit options. */
  limits?: ApiSlskdOptionsGroupsOptionsLimitsOptions;
  /** Gets the list of group member usernames. */
  members?: string[] | null;
  /** User group upload options. */
  upload?: ApiSlskdOptionsGroupsOptionsUploadOptions;
}

/** Options for external integrations. */
export interface ApiSlskdOptionsIntegrationOptions {
  /** FTP options. */
  ftp: ApiSlskdOptionsIntegrationOptionsFtpOptions;
  /** Pushbullet options. */
  pushbullet: ApiSlskdOptionsIntegrationOptionsPushbulletOptions;
}

/** FTP options. */
export interface ApiSlskdOptionsIntegrationOptionsFtpOptions {
  /** Gets the FTP address. */
  address?: string | null;
  /**
   * Gets the connection timeout value, in milliseconds.
   * @format int32
   * @min 0
   * @max 2147483647
   */
  connectionTimeout: number;
  /** Gets a value indicating whether the FTP integration is enabled. */
  enabled: boolean;
  /** Gets the FTP encryption mode. */
  encryptionMode?: string | null;
  /** Gets a value indicating whether FTP certificate errors should be ignored. */
  ignoreCertificateErrors: boolean;
  /** Gets a value indicating whether existing files should be overwritten. */
  overwriteExisting: boolean;
  /** Gets the FTP password. */
  password?: string | null;
  /**
   * Gets the FTP port.
   * @format int32
   * @min 1
   * @max 65535
   */
  port: number;
  /** Gets the remote path for uploads. */
  remotePath?: string | null;
  /**
   * Gets the number of times failing uploads will be retried.
   * @format int32
   * @min 0
   * @max 5
   */
  retryAttempts: number;
  /** Gets the FTP username. */
  username?: string | null;
}

/** Pushbullet options. */
export interface ApiSlskdOptionsIntegrationOptionsPushbulletOptions {
  /** Gets the Pushbullet API access token. */
  accessToken?: string | null;
  /**
   * Gets the cooldown time for Pushbullet notifications, in milliseconds.
   * @format int32
   */
  cooldownTime: number;
  /** Gets a value indicating whether the Pushbullet integration is enabled. */
  enabled: boolean;
  /** Gets the prefix for Pushbullet notification titles. */
  notificationPrefix?: string | null;
  /** Gets a value indicating whether a Pushbullet notification should be sent when a private message is received. */
  notifyOnPrivateMessage: boolean;
  /**
   * Gets a value indicating whether a Pushbullet notification should be sent when the currently logged
   * in user's username is mentioned in a room.
   */
  notifyOnRoomMention: boolean;
  /**
   * Gets the number of times failing Pushbullet notifications will be retried.
   * @format int32
   * @min 0
   * @max 5
   */
  retryAttempts: number;
}

/** Logger options. */
export interface ApiSlskdOptionsLoggerOptions {
  /** Gets a value indicating whether to write logs to disk. */
  disk: boolean;
  /** Gets the URL to a Grafana Loki instance to which to log. */
  loki: string;
}

/** Metrics options. */
export interface ApiSlskdOptionsMetricsOptions {
  /** Metrics endpoint authentication options. */
  authentication: ApiSlskdOptionsMetricsOptionsMetricsAuthenticationOptions;
  /** Gets a value indicating whether the metrics endpoint should be enabled. */
  enabled: boolean;
  /** Gets the url for the metrics endpoint. */
  url: string;
}

/** Metrics endpoint authentication options. */
export interface ApiSlskdOptionsMetricsOptionsMetricsAuthenticationOptions {
  /** Gets a value indicating whether authentication should be disabled. */
  disabled: boolean;
  /**
   * Gets the password for the metrics endpoint.
   * @minLength 1
   * @maxLength 255
   */
  password?: string | null;
  /**
   * Gets the username for the metrics endpoint.
   * @minLength 1
   * @maxLength 255
   */
  username?: string | null;
}

/** Relay options. */
export interface ApiSlskdOptionsRelayOptions {
  /** Gets the agent configuration. */
  agents: Record<string, ApiSlskdOptionsRelayOptionsRelayAgentConfigurationOptions>;
  /** Relay controller configuration options. */
  controller: ApiSlskdOptionsRelayOptionsRelayControllerConfigurationOptions;
  /** Gets a value indicating whether the relay is enabled. */
  enabled: boolean;
  /** Gets the relay mode. */
  mode: string;
}

/** Relay agent configuration options. */
export interface ApiSlskdOptionsRelayOptionsRelayAgentConfigurationOptions {
  /** Gets the comma separated list of CIDRs that are authorized to connect as this agent. */
  cidr?: string | null;
  /**
   * Gets the agent instance name.
   * @minLength 1
   * @maxLength 255
   */
  instanceName?: string | null;
  /**
   * Gets the agent secret.
   * @minLength 16
   * @maxLength 255
   */
  secret?: string | null;
}

/** Relay controller configuration options. */
export interface ApiSlskdOptionsRelayOptionsRelayControllerConfigurationOptions {
  /**
   * Gets the controller address.
   * @format uri
   */
  address?: string | null;
  /**
   * Gets the controller API key.
   * @minLength 16
   * @maxLength 255
   */
  apiKey?: string | null;
  /** Gets a value indicating whether to receive completed downloads from the controller. */
  downloads: boolean;
  /** Gets a value indicating whether controller certificate errors should be ignored. */
  ignoreCertificateErrors: boolean;
  /**
   * Gets the controller secret.
   * @minLength 16
   * @maxLength 255
   */
  secret?: string | null;
}

/** Retention options. */
export interface ApiSlskdOptionsRetentionOptions {
  /** File retention options. */
  files: ApiSlskdOptionsRetentionOptionsFileRetentionOptions;
  /**
   * Gets the time to retain logs, in days.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  logs: number;
  /** Transfer retention options. */
  transfers: ApiSlskdOptionsRetentionOptionsTransferRetentionOptions;
}

/** File retention options. */
export interface ApiSlskdOptionsRetentionOptionsFileRetentionOptions {
  /**
   * Gets the time to retain completed files, in minutes.
   * @format int32
   * @min 30
   * @max 2147483647
   */
  complete?: number | null;
  /**
   * Gets the time to retain incomplete files, in minutes.
   * @format int32
   * @min 30
   * @max 2147483647
   */
  incomplete?: number | null;
}

/** Transfer retention options. */
export interface ApiSlskdOptionsRetentionOptionsTransferRetentionOptions {
  /** Transfer retention options. */
  download?: ApiSlskdOptionsRetentionOptionsTransferRetentionOptionsTransferTypeRetentionOptions;
  /** Transfer retention options. */
  upload?: ApiSlskdOptionsRetentionOptionsTransferRetentionOptionsTransferTypeRetentionOptions;
}

/** Transfer retention options. */
export interface ApiSlskdOptionsRetentionOptionsTransferRetentionOptionsTransferTypeRetentionOptions {
  /**
   * Gets the time to retain cancelled transfers, in minutes.
   * @format int32
   * @min 5
   * @max 2147483647
   */
  cancelled?: number | null;
  /**
   * Gets the time to retain errored transfers, in minutes.
   * @format int32
   * @min 5
   * @max 2147483647
   */
  errored?: number | null;
  /**
   * Gets the time to retain successful transfers, in minutes.
   * @format int32
   * @min 5
   * @max 2147483647
   */
  succeeded?: number | null;
}

/** Share options. */
export interface ApiSlskdOptionsSharesOptions {
  /** Share caching options. */
  cache: ApiSlskdOptionsSharesOptionsShareCacheOptions;
  /** Gets the list of paths to shared files. */
  directories: string[];
  /** Gets the list of shared file filters. */
  filters: string[];
}

/** Share caching options. */
export interface ApiSlskdOptionsSharesOptionsShareCacheOptions {
  /**
   * Gets the time to retain the cache (the interval on which to re-scan automatically), in minutes.
   * @format int32
   * @min 60
   * @max 2147483647
   */
  retention?: number | null;
  /** Gets the type of storage to use for the share cache. */
  storageMode?: string | null;
  /**
   * Gets the number of workers to use while scanning shares.
   * @format int32
   * @min 1
   * @max 128
   */
  workers: number;
}

/** Soulseek client options. */
export interface ApiSlskdOptionsSoulseekOptions {
  /** Gets the address of the Soulseek server. */
  address: string;
  /** Connection options. */
  connection: ApiSlskdOptionsSoulseekOptionsConnectionOptions;
  /** Gets the description of the Soulseek user. */
  description: string;
  diagnosticLevel: ApiSoulseekDiagnosticsDiagnosticLevel;
  /** Distributed network options. */
  distributedNetwork: ApiSlskdOptionsSoulseekOptionsDistributedNetworkOptions;
  /** Gets the local IP address on which to listen for incoming connections. */
  listenIpAddress: string;
  /**
   * Gets the port on which to listen for incoming connections.
   * @format int32
   * @min 1024
   * @max 65535
   */
  listenPort: number;
  /** Gets the password for the Soulseek network. */
  password: string;
  /**
   * Gets the port of the Soulseek server.
   * @format int32
   * @min 1024
   * @max 65535
   */
  port: number;
  /** Gets the username for the Soulseek network. */
  username: string;
}

/** Connection options. */
export interface ApiSlskdOptionsSoulseekOptionsConnectionOptions {
  /** Connection buffer options. */
  buffer?: ApiSlskdOptionsSoulseekOptionsConnectionOptionsBufferOptions;
  /** Connection proxy options. */
  proxy?: ApiSlskdOptionsSoulseekOptionsConnectionOptionsProxyOptions;
  /** Connection timeout options. */
  timeout?: ApiSlskdOptionsSoulseekOptionsConnectionOptionsTimeoutOptions;
}

/** Connection buffer options. */
export interface ApiSlskdOptionsSoulseekOptionsConnectionOptionsBufferOptions {
  /**
   * Gets the connection read buffer size, in bytes.
   * @format int32
   * @min 1024
   * @max 2147483647
   */
  read: number;
  /**
   * Gets the read/write buffer size for transfers, in bytes.
   * @format int32
   * @min 81920
   * @max 2147483647
   */
  transfer: number;
  /**
   * Gets the connection write buffer size, in bytes.
   * @format int32
   * @min 1024
   * @max 2147483647
   */
  write: number;
  /**
   * Gets the size of the queue for double buffered writes.
   * @format int32
   * @min 5
   * @max 5000
   */
  writeQueue: number;
}

/** Connection proxy options. */
export interface ApiSlskdOptionsSoulseekOptionsConnectionOptionsProxyOptions {
  /**
   * Gets the proxy address.
   * @minLength 1
   * @maxLength 255
   */
  address?: string | null;
  /** Gets a value indicating whether the proxy is enabled. */
  enabled: boolean;
  /**
   * Gets the proxy password, if applicable.
   * @minLength 1
   * @maxLength 255
   */
  password?: string | null;
  /**
   * Gets the proxy port.
   * @format int32
   * @min 1
   * @max 65535
   */
  port?: number | null;
  /**
   * Gets the proxy username, if applicable.
   * @minLength 1
   * @maxLength 255
   */
  username?: string | null;
}

/** Connection timeout options. */
export interface ApiSlskdOptionsSoulseekOptionsConnectionOptionsTimeoutOptions {
  /**
   * Gets the connection timeout value, in milliseconds.
   * @format int32
   * @min 1000
   * @max 2147483647
   */
  connect: number;
  /**
   * Gets the connection inactivity timeout, in milliseconds.
   * @format int32
   * @min 1000
   * @max 2147483647
   */
  inactivity: number;
}

/** Distributed network options. */
export interface ApiSlskdOptionsSoulseekOptionsDistributedNetworkOptions {
  /**
   * Gets the distributed child connection limit.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  childLimit: number;
  /** Gets a value indicating whether to accept distributed child connections. */
  disableChildren: boolean;
  /** Gets a value indicating whether the distributed network should be disabled. */
  disabled: boolean;
  /** Gets a value indicating whether distributed network logging should be enabled. */
  logging: boolean;
}

/** Web server options. */
export interface ApiSlskdOptionsWebOptions {
  /** Authentication options. */
  authentication: ApiSlskdOptionsWebOptionsWebAuthenticationOptions;
  /**
   * Gets the path to static web content.
   * @minLength 1
   * @maxLength 255
   */
  contentPath: string;
  /** HTTPS options. */
  https: ApiSlskdOptionsWebOptionsHttpsOptions;
  /** Gets a value indicating whether HTTP request logging should be enabled. */
  logging: boolean;
  /**
   * Gets the HTTP listen port.
   * @format int32
   * @min 1
   * @max 65535
   */
  port: number;
  /** Gets the base url for web requests. */
  urlBase: string;
}

/** HTTPS options. */
export interface ApiSlskdOptionsWebOptionsHttpsOptions {
  /** Certificate options. */
  certificate?: ApiSlskdOptionsWebOptionsHttpsOptionsCertificateOptions;
  /** Gets a value indicating whether HTTPS should be disabled. */
  disabled: boolean;
  /** Gets a value indicating whether HTTP requests should be redirected to HTTPS. */
  force: boolean;
  /**
   * Gets the HTTPS listen port.
   * @format int32
   * @min 1
   * @max 65535
   */
  port: number;
}

/** Certificate options. */
export interface ApiSlskdOptionsWebOptionsHttpsOptionsCertificateOptions {
  /** Gets the password for the X509 certificate. */
  password?: string | null;
  /** Gets the path to the the X509 certificate .pfx file. */
  pfx?: string | null;
}

/** Authentication options. */
export interface ApiSlskdOptionsWebOptionsWebAuthenticationOptions {
  /** Gets API keys. */
  apiKeys?: Record<string, ApiSlskdOptionsWebOptionsWebAuthenticationOptionsApiKeyOptions>;
  /** Gets a value indicating whether authentication should be disabled. */
  disabled: boolean;
  /** JWT options. */
  jwt?: ApiSlskdOptionsWebOptionsWebAuthenticationOptionsJwtOptions;
  /**
   * Gets the password for the web UI.
   * @minLength 1
   * @maxLength 255
   */
  password?: string | null;
  /**
   * Gets the username for the web UI.
   * @minLength 1
   * @maxLength 255
   */
  username?: string | null;
}

/** API key options. */
export interface ApiSlskdOptionsWebOptionsWebAuthenticationOptionsApiKeyOptions {
  /** Gets the comma separated list of CIDRs that are authorized to use the key. */
  cidr?: string | null;
  /**
   * Gets the API key value.
   * @minLength 16
   * @maxLength 255
   */
  key?: string | null;
  /** Gets the role for the key. */
  role?: string | null;
}

/** JWT options. */
export interface ApiSlskdOptionsWebOptionsWebAuthenticationOptionsJwtOptions {
  /**
   * Gets the key with which to sign JWTs.
   * @minLength 16
   * @maxLength 255
   */
  key?: string | null;
  /**
   * Gets the TTL for JWTs, in milliseconds.
   * @format int32
   * @min 3600
   * @max 2147483647
   */
  ttl: number;
}

/** Tracking information for a Relay agent. */
export interface ApiSlskdRelayAgent {
  /** The IP address associated with the active connection. */
  ipAddress: string;
  /** The name of the agent. */
  name: string;
}

export interface ApiSlskdRelayControllerState {
  address: string;
  /** The state of a Relay client. */
  state: ApiSlskdRelayRelayClientState;
}

/** The state of a Relay client. */
export enum ApiSlskdRelayRelayClientState {
  Disconnected = "Disconnected",
  Connected = "Connected",
  Connecting = "Connecting",
  Reconnecting = "Reconnecting",
}

/** The mode the Relay is operating under. */
export enum ApiSlskdRelayRelayMode {
  Controller = "Controller",
  Agent = "Agent",
  Debug = "Debug",
}

export interface ApiSlskdRelayState {
  agents: ApiSlskdRelayAgent[];
  controller: ApiSlskdRelayControllerState;
  /** The mode the Relay is operating under. */
  mode: ApiSlskdRelayRelayMode;
}

/** A search request. */
export interface ApiSlskdSearchAPISearchRequest {
  /**
   * Gets or sets the maximum number of file results to accept before the search is considered complete. (Default = 10,000).
   * @format int32
   */
  fileLimit?: number | null;
  /** Gets or sets a value indicating whether responses are to be filtered. (Default = true). */
  filterResponses?: boolean | null;
  /**
   * Gets or sets the unique search identifier.
   * @format uuid
   */
  id?: string | null;
  /**
   * Gets or sets the maximum queue depth a peer may have in order for a response to be processed. (Default = 1000000).
   * @format int32
   */
  maximumPeerQueueLength?: number | null;
  /**
   * Gets or sets the minimum upload speed a peer must have in order for a response to be processed. (Default = 0).
   * @format int32
   */
  minimumPeerUploadSpeed?: number | null;
  /**
   * Gets or sets the minimum number of files a response must contain in order to be processed. (Default = 1).
   * @format int32
   */
  minimumResponseFileCount?: number | null;
  /**
   * Gets or sets the maximum number of search results to accept before the search is considered complete. (Default = 100).
   * @format int32
   */
  responseLimit?: number | null;
  /** Gets or sets the search text. */
  searchText: string;
  /**
   * Gets or sets the search timeout value, in seconds, used to determine when the search is complete. (Default = 15).
   * @format int32
   */
  searchTimeout?: number | null;
  /**
   * Gets or sets the search token.
   * @format int32
   */
  token?: number | null;
}

export interface ApiSlskdSearchFile {
  /** @format int32 */
  bitDepth?: number | null;
  /** @format int32 */
  bitRate?: number | null;
  /** @format int32 */
  code: number;
  extension: string;
  filename: string;
  isLocked: boolean;
  isVariableBitRate?: boolean | null;
  /** @format int32 */
  length?: number | null;
  /** @format int32 */
  sampleRate?: number | null;
  /** @format int64 */
  size: number;
}

export interface ApiSlskdSearchResponse {
  /** @format int32 */
  fileCount: number;
  files: ApiSlskdSearchFile[];
  hasFreeUploadSlot: boolean;
  /** @format int32 */
  lockedFileCount: number;
  lockedFiles: ApiSlskdSearchFile[];
  /** @format int64 */
  queueLength: number;
  /** @format int32 */
  token: number;
  /** @format int32 */
  uploadSpeed: number;
  username: string;
}

export interface ApiSlskdSearchSearch {
  /** @format date-time */
  endedAt?: string | null;
  /** @format int32 */
  fileCount: number;
  /** @format uuid */
  id: string;
  readonly isComplete: boolean;
  /** @format int32 */
  lockedFileCount: number;
  /** @format int32 */
  responseCount: number;
  responses: ApiSlskdSearchResponse[];
  searchText: string;
  /** @format date-time */
  startedAt: string;
  state: ApiSoulseekSearchStates;
  /** @format int32 */
  token: number;
}

export interface ApiSlskdServerState {
  address: string;
  ipEndPoint: ApiSystemNetIPEndPoint;
  readonly isConnected: boolean;
  readonly isLoggedIn: boolean;
  readonly isTransitioning: boolean;
  state: ApiSoulseekSoulseekClientStates;
}

/** Share state. */
export interface ApiSlskdShareState {
  cancelled: boolean;
  /** @format int32 */
  directories: number;
  faulted: boolean;
  /** @format int32 */
  files: number;
  hosts: string[];
  ready: boolean;
  scanPending: boolean;
  /** @format double */
  scanProgress: number;
  scanning: boolean;
}

/** A file share. */
export interface ApiSlskdSharesShare {
  alias: string;
  /** @format int32 */
  directories?: number | null;
  /** @format int32 */
  files?: number | null;
  id: string;
  isExcluded: boolean;
  localPath: string;
  raw: string;
  remotePath: string;
}

/** Application service state. */
export interface ApiSlskdState {
  distributedNetwork: ApiSlskdDistributedNetworkState;
  pendingReconnect: boolean;
  pendingRestart: boolean;
  relay: ApiSlskdRelayState;
  rooms: string[];
  server: ApiSlskdServerState;
  /** Share state. */
  shares: ApiSlskdShareState;
  user: ApiSlskdUserState;
  users: ApiSlskdUsersUser[];
  version: ApiSlskdVersionState;
}

export interface ApiSlskdTransfersAPIDirectoryResponse {
  directory: string;
  /** @format int32 */
  fileCount: number;
  files: ApiSlskdTransfersTransfer[];
}

export interface ApiSlskdTransfersAPIQueueDownloadRequest {
  /** Gets or sets the filename to download. */
  filename: string;
  /**
   * Gets or sets the size of the file.
   * @format int64
   */
  size: number;
}

/** A single file transfer. */
export interface ApiSlskdTransfersAPITransfer {
  /**
   * Gets the current average transfer speed.
   * @format double
   */
  averageSpeed: number;
  /**
   * Gets the number of remaining bytes to be transferred.
   * @format int64
   */
  bytesRemaining: number;
  /**
   * Gets the total number of bytes transferred.
   * @format int64
   */
  bytesTransferred: number;
  direction: ApiSoulseekTransferDirection;
  /**
   * Gets the current duration of the transfer, if it has been started.
   * @format double
   */
  elapsedTime?: number | null;
  /**
   * Gets the UTC time at which the transfer transitioned into the Soulseek.TransferStates.Completed state.
   * @format date-time
   */
  endTime?: string | null;
  /** Gets the Exception that caused the failure of the transfer, if applicable. */
  exception: string;
  /** Gets the filename of the file to be transferred. */
  filename: string;
  /** Gets the transfer id. */
  readonly id: string;
  ipEndPoint: ApiSystemNetIPEndPoint;
  /**
   * Gets the current progress in percent.
   * @format double
   */
  percentComplete: number;
  /**
   * Gets the current place in queue, if it has been fetched.
   * @format int32
   */
  placeInQueue?: number | null;
  /**
   * Gets the projected remaining duration of the transfer.
   * @format double
   */
  remainingTime?: number | null;
  /**
   * Gets the remote unique token for the transfer.
   * @format int32
   */
  remoteToken?: number | null;
  /**
   * Gets the size of the file to be transferred, in bytes.
   * @format int64
   */
  size: number;
  /**
   * Gets the starting offset of the transfer, in bytes.
   * @format int64
   */
  startOffset: number;
  /**
   * Gets the UTC time at which the transfer transitioned into the Soulseek.TransferStates.InProgress state.
   * @format date-time
   */
  startTime?: string | null;
  state: ApiSoulseekTransferStates;
  /**
   * Gets the unique token for the transfer.
   * @format int32
   */
  token: number;
  /** Gets the username of the peer to or from which the file is to be transferred. */
  username: string;
}

export interface ApiSlskdTransfersAPIUserResponse {
  directories: ApiSlskdTransfersAPIDirectoryResponse[];
  username: string;
}

export interface ApiSlskdTransfersTransfer {
  /** @format double */
  averageSpeed: number;
  /** @format int64 */
  readonly bytesRemaining: number;
  /** @format int64 */
  bytesTransferred: number;
  direction: ApiSoulseekTransferDirection;
  elapsedTime?: ApiSystemTimeSpan;
  /**
   * The time at which the transfer ended, or null if the transfer has not yet started or is in progress.
   * @format date-time
   */
  endedAt?: string | null;
  /** @format date-time */
  enqueuedAt?: string | null;
  exception: string;
  filename: string;
  /** @format uuid */
  id: string;
  /** @format double */
  readonly percentComplete: number;
  /** @format int32 */
  placeInQueue?: number | null;
  remainingTime?: ApiSystemTimeSpan;
  /** @format date-time */
  requestedAt: string;
  /** @format int64 */
  size: number;
  /** @format int64 */
  startOffset: number;
  /** @format date-time */
  startedAt?: string | null;
  state: ApiSoulseekTransferStates;
  username: string;
}

export interface ApiSlskdUserPrivilegeState {
  isPrivileged: boolean;
  /** @format int32 */
  privilegesRemaining: number;
}

export interface ApiSlskdUserState {
  privileges: ApiSlskdUserPrivilegeState;
  statistics: ApiSlskdUserStatisticsState;
  username: string;
}

export interface ApiSlskdUserStatisticsState {
  /** @format int32 */
  averageSpeed: number;
  /** @format int32 */
  directoryCount: number;
  /** @format int32 */
  fileCount: number;
  /** @format int64 */
  uploadCount: number;
}

export interface ApiSlskdUsersAPIDirectoryContentsRequest {
  directory: string;
}

export interface ApiSlskdUsersInfo {
  description: string;
  hasFreeUploadSlot: boolean;
  hasPicture: boolean;
  /** @format byte */
  picture: string;
  /** @format int32 */
  queueLength: number;
  /** @format int32 */
  uploadSlots: number;
}

export interface ApiSlskdUsersStatistics {
  /**
   * Gets the average upload speed of the user.
   * @format int32
   */
  averageSpeed: number;
  /**
   * Gets the number of directories shared by the user.
   * @format int32
   */
  directoryCount: number;
  /**
   * Gets the number of files shared by the user.
   * @format int32
   */
  fileCount: number;
  /**
   * Gets the number of uploads tracked by the server for this user.
   * @format int64
   */
  uploadCount: number;
}

/** User status. */
export interface ApiSlskdUsersStatus {
  /** Gets a value indicating whether the user is privileged. */
  isPrivileged: boolean;
  presence: ApiSoulseekUserPresence;
}

export interface ApiSlskdUsersUser {
  /** Gets the user's configured group. */
  group: string;
  statistics: ApiSlskdUsersStatistics;
  /** User status. */
  status: ApiSlskdUsersStatus;
  /** Gets the username of the user. */
  username: string;
}

export interface ApiSlskdVersionState {
  current: string;
  full: string;
  isCanary: boolean;
  isDevelopment: boolean;
  isUpdateAvailable?: boolean | null;
  latest: string;
}

export interface ApiSoulseekBrowseResponse {
  readonly directories?: ApiSoulseekDirectory[] | null;
  /** @format int32 */
  readonly directoryCount: number;
  readonly lockedDirectories?: ApiSoulseekDirectory[] | null;
  /** @format int32 */
  readonly lockedDirectoryCount: number;
}

export enum ApiSoulseekDiagnosticsDiagnosticLevel {
  None = "None",
  Warning = "Warning",
  Info = "Info",
  Debug = "Debug",
}

export interface ApiSoulseekDirectory {
  /** @format int32 */
  readonly fileCount: number;
  readonly files?: ApiSoulseekFile[] | null;
  name?: string | null;
}

export interface ApiSoulseekFile {
  /** @format int32 */
  readonly attributeCount: number;
  readonly attributes?: ApiSoulseekFileAttribute[] | null;
  /** @format int32 */
  readonly bitDepth?: number | null;
  /** @format int32 */
  readonly bitRate?: number | null;
  /** @format int32 */
  code: number;
  extension?: string | null;
  filename?: string | null;
  readonly isVariableBitRate?: boolean | null;
  /** @format int32 */
  readonly length?: number | null;
  /** @format int32 */
  readonly sampleRate?: number | null;
  /** @format int64 */
  size: number;
}

export interface ApiSoulseekFileAttribute {
  type: ApiSoulseekFileAttributeType;
  /** @format int32 */
  value: number;
}

export enum ApiSoulseekFileAttributeType {
  BitRate = "BitRate",
  Length = "Length",
  VariableBitRate = "VariableBitRate",
  SampleRate = "SampleRate",
  BitDepth = "BitDepth",
}

export enum ApiSoulseekSearchStates {
  None = "None",
  Requested = "Requested",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  TimedOut = "TimedOut",
  ResponseLimitReached = "ResponseLimitReached",
  FileLimitReached = "FileLimitReached",
  Errored = "Errored",
}

export enum ApiSoulseekSoulseekClientStates {
  None = "None",
  Disconnected = "Disconnected",
  Connected = "Connected",
  LoggedIn = "LoggedIn",
  Connecting = "Connecting",
  LoggingIn = "LoggingIn",
  Disconnecting = "Disconnecting",
}

export enum ApiSoulseekTransferDirection {
  Download = "Download",
  Upload = "Upload",
}

export enum ApiSoulseekTransferStates {
  None = "None",
  Requested = "Requested",
  Queued = "Queued",
  Initializing = "Initializing",
  InProgress = "InProgress",
  Completed = "Completed",
  Succeeded = "Succeeded",
  Cancelled = "Cancelled",
  TimedOut = "TimedOut",
  Errored = "Errored",
  Rejected = "Rejected",
  Aborted = "Aborted",
  Locally = "Locally",
  Remotely = "Remotely",
}

export enum ApiSoulseekUserPresence {
  Offline = "Offline",
  Away = "Away",
  Online = "Online",
}

export type ApiStartupListData = ApiSlskdOptions;

export type ApiStatusDetailData = ApiSlskdUsersStatus;

export type ApiStatusDetailError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export enum ApiSystemIOFileAttributes {
  None = "None",
  ReadOnly = "ReadOnly",
  Hidden = "Hidden",
  System = "System",
  Directory = "Directory",
  Archive = "Archive",
  Device = "Device",
  Normal = "Normal",
  Temporary = "Temporary",
  SparseFile = "SparseFile",
  ReparsePoint = "ReparsePoint",
  Compressed = "Compressed",
  Offline = "Offline",
  NotContentIndexed = "NotContentIndexed",
  Encrypted = "Encrypted",
  IntegrityStream = "IntegrityStream",
  NoScrubData = "NoScrubData",
}

export interface ApiSystemNetIPAddress {
  readonly isIPv4MappedToIPv6: boolean;
  readonly isIPv6LinkLocal: boolean;
  readonly isIPv6Multicast: boolean;
  readonly isIPv6SiteLocal: boolean;
  readonly isIPv6Teredo: boolean;
  readonly isIPv6UniqueLocal: boolean;
  /**
   * @deprecated
   * @format int64
   */
  address: number;
  addressFamily: ApiSystemNetSocketsAddressFamily;
  /** @format int64 */
  scopeId: number;
}

export interface ApiSystemNetIPEndPoint {
  address: ApiSystemNetIPAddress;
  addressFamily: ApiSystemNetSocketsAddressFamily;
  /** @format int32 */
  port: number;
}

export enum ApiSystemNetSocketsAddressFamily {
  Unspecified = "Unspecified",
  Unix = "Unix",
  InterNetwork = "InterNetwork",
  ImpLink = "ImpLink",
  Pup = "Pup",
  Chaos = "Chaos",
  NS = "NS",
  Iso = "Iso",
  Ecma = "Ecma",
  DataKit = "DataKit",
  Ccitt = "Ccitt",
  Sna = "Sna",
  DecNet = "DecNet",
  DataLink = "DataLink",
  Lat = "Lat",
  HyperChannel = "HyperChannel",
  AppleTalk = "AppleTalk",
  NetBios = "NetBios",
  VoiceView = "VoiceView",
  FireFox = "FireFox",
  Banyan = "Banyan",
  Atm = "Atm",
  InterNetworkV6 = "InterNetworkV6",
  Cluster = "Cluster",
  Ieee12844 = "Ieee12844",
  Irda = "Irda",
  NetworkDesigners = "NetworkDesigners",
  Max = "Max",
  Packet = "Packet",
  ControllerAreaNetwork = "ControllerAreaNetwork",
  Unknown = "Unknown",
}

export interface ApiSystemTimeSpan {
  /** @format int32 */
  readonly days: number;
  /** @format int32 */
  readonly hours: number;
  /** @format int32 */
  readonly microseconds: number;
  /** @format int32 */
  readonly milliseconds: number;
  /** @format int32 */
  readonly minutes: number;
  /** @format int32 */
  readonly nanoseconds: number;
  /** @format int32 */
  readonly seconds: number;
  /** @format int64 */
  ticks: number;
  /** @format double */
  readonly totalDays: number;
  /** @format double */
  readonly totalHours: number;
  /** @format double */
  readonly totalMicroseconds: number;
  /** @format double */
  readonly totalMilliseconds: number;
  /** @format double */
  readonly totalMinutes: number;
  /** @format double */
  readonly totalNanoseconds: number;
  /** @format double */
  readonly totalSeconds: number;
}

export type ApiUploadsAllCompletedDeleteData = unknown;

export type ApiUploadsDeleteData = unknown;

export type ApiUploadsDeleteError = ApiMicrosoftAspNetCoreMvcProblemDetails;

export type ApiUploadsDetail2Data = ApiSlskdTransfersAPIUserResponse;

export type ApiUploadsDetailData = ApiSlskdTransfersAPITransfer;

export type ApiUploadsListData = ApiSlskdTransfersAPIUserResponse[];

export type ApiVersionLatestListData = ApiSlskdVersionState;

export type ApiVersionListData = string;

export type ApiYamlCreateData = unknown;

export type ApiYamlListData = string;

export type ApiYamlLocationListData = string;

export type ApiYamlValidateCreateData = unknown;
