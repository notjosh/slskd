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

export enum ApiAddressFamily {
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

export type ApiAgentDeleteData = unknown;

export type ApiAgentUpdateData = unknown;

/** API key options. */
export interface ApiApiKeyOptions {
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

export type ApiApplicationDeleteData = unknown;

export type ApiApplicationListData = unknown;

export type ApiApplicationUpdateData = unknown;

export type ApiAvailableListData = ApiRoomInfo[];

/** Built in blacklisted group options. */
export interface ApiBlacklistedOptions {
  /** Gets the list of group CIDRs. */
  cidrs?: string[] | null;
  /** Gets the list of group member usernames. */
  members?: string[] | null;
}

export type ApiBrowseDetailData = ApiDirectory[];

/** @format double */
export type ApiBrowseStatusDetailData = number;

/** Connection buffer options. */
export interface ApiBufferOptions {
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

/** Built in user group options. */
export interface ApiBuiltInOptions {
  /** Upload limit options. */
  limits: ApiLimitsOptions;
  /** User group upload options. */
  upload: ApiUploadOptions;
}

/** Certificate options. */
export interface ApiCertificateOptions {
  /** Gets the password for the X509 certificate. */
  password?: string | null;
  /** Gets the path to the the X509 certificate .pfx file. */
  pfx?: string | null;
}

/** Connection options. */
export interface ApiConnectionOptions {
  /** Connection buffer options. */
  buffer: ApiBufferOptions;
  /** Connection proxy options. */
  proxy: ApiProxyOptions;
  /** Connection timeout options. */
  timeout: ApiTimeoutOptions;
}

export type ApiContentsDetailData = ApiDirectory[];

export type ApiContentsListData = ApiDirectory[];

export type ApiControllerDownloadsDetailData = unknown;

export type ApiControllerFilesCreateData = unknown;

export type ApiControllerSharesCreateData = unknown;

export interface ApiConversation {
  readonly hasUnAcknowledgedMessages: boolean;
  isActive: boolean;
  messages?: ApiPrivateMessage[] | null;
  /** @format int32 */
  unAcknowledgedMessageCount: number;
  username?: string | null;
}

export type ApiConversationsCreateData = unknown;

export type ApiConversationsDeleteData = unknown;

export type ApiConversationsDetailData = ApiConversation;

export type ApiConversationsListData = ApiConversation[];

export type ApiConversationsUpdate2Data = unknown;

export type ApiConversationsUpdateData = unknown;

export type ApiDebugListData = string;

export enum ApiDiagnosticLevel {
  None = "None",
  Warning = "Warning",
  Info = "Info",
  Debug = "Debug",
}

/** Directory options. */
export interface ApiDirectoriesOptions {
  /** Gets the path where downloaded files are saved. */
  downloads?: string | null;
  /** Gets the path where incomplete downloads are saved. */
  incomplete?: string | null;
}

export interface ApiDirectory {
  /** @format int32 */
  readonly fileCount: number;
  readonly files?: ApiFile[] | null;
  name?: string | null;
}

export interface ApiDirectoryContentsRequest {
  directory?: string | null;
}

export type ApiDirectoryCreateData = ApiDirectory;

/** Distributed network options. */
export interface ApiDistributedNetworkOptions {
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

export type ApiDownloadsAllCompletedDeleteData = unknown;

export type ApiDownloadsCreateData = unknown;

export type ApiDownloadsDeleteData = unknown;

export type ApiDownloadsDetail2Data = unknown;

export type ApiDownloadsDetailData = ApiTransfer;

export type ApiDownloadsDirectoriesDeleteData = unknown;

export type ApiDownloadsDirectoriesDetailData = ApiFilesystemDirectory;

export type ApiDownloadsDirectoriesListData = ApiFilesystemDirectory;

export type ApiDownloadsFilesDeleteData = unknown;

export type ApiDownloadsListData = unknown;

export type ApiDownloadsPositionDetailData = ApiTransfer;

export type ApiDumpListData = unknown;

export type ApiEnabledListData = boolean;

export type ApiEndpointDetailData = ApiIPEndPoint;

/** Feature options. */
export interface ApiFeatureOptions {
  /** Gets a value indicating whether swagger documentation and UI should be enabled. */
  swagger: boolean;
}

export interface ApiFile {
  /** @format int32 */
  readonly attributeCount: number;
  readonly attributes?: ApiFileAttribute[] | null;
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

export interface ApiFileAttribute {
  type: ApiFileAttributeType;
  /** @format int32 */
  value: number;
}

export enum ApiFileAttributeType {
  BitRate = "BitRate",
  Length = "Length",
  VariableBitRate = "VariableBitRate",
  SampleRate = "SampleRate",
  BitDepth = "BitDepth",
}

export enum ApiFileAttributes {
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

/** File retention options. */
export interface ApiFileRetentionOptions {
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

/** A file directory on the host filesystem. */
export interface ApiFilesystemDirectory {
  attributes: ApiFileAttributes;
  /**
   * The timestamp at which the directory was created.
   * @format date-time
   */
  createdAt: string;
  /** The directories within the directory. */
  directories?: ApiFilesystemDirectory[] | null;
  /** The files within the directory. */
  files?: ApiFilesystemFile[] | null;
  /** The fully qualified name of the directory. */
  fullName?: string | null;
  /**
   * The timestamp at which the directory was last modified.
   * @format date-time
   */
  modifiedAt: string;
  /** The name of the directory. */
  name?: string | null;
}

/** A file on the host filesystem. */
export interface ApiFilesystemFile {
  attributes: ApiFileAttributes;
  /**
   * The timestamp at which the file was created.
   * @format date-time
   */
  createdAt: string;
  /** The fully qualified name of the file. */
  fullName?: string | null;
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
  name?: string | null;
}

/** Filter options. */
export interface ApiFiltersOptions {
  /** Search filter options. */
  search: ApiSearchOptions;
}

/** Optional flags. */
export interface ApiFlagsOptions {
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

/** FTP options. */
export interface ApiFtpOptions {
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

/** Gets global download options. */
export interface ApiGlobalDownloadOptions {
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

/** Global options. */
export interface ApiGlobalOptions {
  /** Gets global download options. */
  download: ApiGlobalDownloadOptions;
  /** Global upload options. */
  upload: ApiGlobalUploadOptions;
}

/** Global upload options. */
export interface ApiGlobalUploadOptions {
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
export interface ApiGroupsOptions {
  /** Built in blacklisted group options. */
  blacklisted: ApiBlacklistedOptions;
  /** Built in user group options. */
  default: ApiBuiltInOptions;
  /** Built in leecher group options. */
  leechers: ApiLeecherOptions;
  /** Gets user defined groups and options. */
  userDefined?: Record<string, ApiUserDefinedOptions>;
}

/** HTTPS options. */
export interface ApiHttpsOptions {
  /** Certificate options. */
  certificate: ApiCertificateOptions;
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

export interface ApiIPAddress {
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
  addressFamily: ApiAddressFamily;
  /** @format int64 */
  scopeId: number;
}

export interface ApiIPEndPoint {
  address: ApiIPAddress;
  addressFamily: ApiAddressFamily;
  /** @format int32 */
  port: number;
}

export type ApiIncompleteDirectoriesDeleteData = unknown;

export type ApiIncompleteDirectoriesDetailData = ApiFilesystemDirectory;

export type ApiIncompleteDirectoriesListData = ApiFilesystemDirectory;

export type ApiIncompleteFilesDeleteData = unknown;

export interface ApiInfo {
  description?: string | null;
  hasFreeUploadSlot: boolean;
  hasPicture: boolean;
  /** @format byte */
  picture?: string | null;
  /** @format int32 */
  queueLength: number;
  /** @format int32 */
  uploadSlots: number;
}

export type ApiInfoDetailData = ApiInfo;

/** Options for external integrations. */
export interface ApiIntegrationOptions {
  /** FTP options. */
  ftp: ApiFtpOptions;
  /** Pushbullet options. */
  pushbullet: ApiPushbulletOptions;
}

export type ApiJoinedCreateData = ApiRoom;

export type ApiJoinedDeleteData = unknown;

export type ApiJoinedDetailData = ApiRoom;

export type ApiJoinedListData = Record<string, Record<string, ApiRoom>>;

export type ApiJoinedMembersCreateData = unknown;

export type ApiJoinedMessagesCreateData = unknown;

export type ApiJoinedMessagesDetailData = ApiRoomMessage[];

export type ApiJoinedTickerCreateData = unknown;

export type ApiJoinedUsersDetailData = ApiUserData[];

/** JWT options. */
export interface ApiJwtOptions {
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

/** Built in leecher group options. */
export interface ApiLeecherOptions {
  /** Upload limit options. */
  limits: ApiLimitsOptions;
  /** Leecher threshold options. */
  thresholds: ApiThresholdOptions;
  /** User group upload options. */
  upload: ApiUploadOptions;
}

/** Extended limit options. */
export interface ApiLimitsExtendedOptions {
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
export interface ApiLimitsOptions {
  /** Extended limit options. */
  daily: ApiLimitsExtendedOptions;
  /** Extended limit options. */
  queued: ApiLimitsExtendedOptions;
  /** Extended limit options. */
  weekly: ApiLimitsExtendedOptions;
}

/** Logger options. */
export interface ApiLoggerOptions {
  /** Gets a value indicating whether to write logs to disk. */
  disk: boolean;
  /** Gets the URL to a Grafana Loki instance to which to log. */
  loki?: string | null;
}

export interface ApiLoginRequest {
  password?: string | null;
  username?: string | null;
}

export type ApiLogsListData = unknown;

export enum ApiMessageDirection {
  Out = "Out",
  In = "In",
}

export type ApiMessagesDetailData = ApiPrivateMessage[];

/** Metrics endpoint authentication options. */
export interface ApiMetricsAuthenticationOptions {
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

export type ApiMetricsListData = unknown;

/** Metrics options. */
export interface ApiMetricsOptions {
  /** Metrics endpoint authentication options. */
  authentication: ApiMetricsAuthenticationOptions;
  /** Gets a value indicating whether the metrics endpoint should be enabled. */
  enabled: boolean;
  /** Gets the url for the metrics endpoint. */
  url?: string | null;
}

/** Application options. */
export interface ApiOptions {
  /** Gets a value indicating whether the application should run in debug mode. */
  debug: boolean;
  /** Directory options. */
  directories: ApiDirectoriesOptions;
  /** Feature options. */
  feature: ApiFeatureOptions;
  /** Filter options. */
  filters: ApiFiltersOptions;
  /** Optional flags. */
  flags: ApiFlagsOptions;
  /** Global options. */
  global: ApiGlobalOptions;
  /** User groups. */
  groups: ApiGroupsOptions;
  /** Gets the unique name for this instance. */
  instanceName?: string | null;
  /** Options for external integrations. */
  integration: ApiIntegrationOptions;
  /** Logger options. */
  logger: ApiLoggerOptions;
  /** Metrics options. */
  metrics: ApiMetricsOptions;
  /** Relay options. */
  relay: ApiRelayOptions;
  /** Gets a value indicating whether remote configuration of options is allowed. */
  remoteConfiguration: boolean;
  /** Gets a value indicating whether remote file management is allowed. */
  remoteFileManagement: boolean;
  /** Retention options. */
  retention: ApiRetentionOptions;
  /** Gets a list of rooms to automatically join upon connection. */
  rooms?: string[] | null;
  /** Share options. */
  shares: ApiSharesOptions;
  /** Soulseek client options. */
  soulseek: ApiSoulseekOptions;
  /** Web server options. */
  web: ApiWebOptions;
}

export type ApiOptionsListData = ApiOptions;

export type ApiPostApplicationData = unknown;

/** A private message. */
export interface ApiPrivateMessage {
  direction: ApiMessageDirection;
  /**
   * The unique message id, used to acknowledge receipt.
   * @format int32
   */
  id: number;
  /** A value indicating whether the message has been acknowledged. */
  isAcknowledged: boolean;
  /** The message. */
  message?: string | null;
  /**
   * The UTC timestamp of the message.
   * @format date-time
   */
  timestamp: string;
  /** The username of the remote user. */
  username?: string | null;
}

export interface ApiProblemDetails {
  detail?: string | null;
  instance?: string | null;
  /** @format int32 */
  status?: number | null;
  title?: string | null;
  type?: string | null;
  [key: string]: unknown;
}

/** Connection proxy options. */
export interface ApiProxyOptions {
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

export type ApiPublicchatCreateData = unknown;

export type ApiPublicchatDeleteData = unknown;

/** Pushbullet options. */
export interface ApiPushbulletOptions {
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

export interface ApiQueueDownloadRequest {
  /** Gets or sets the filename to download. */
  filename?: string | null;
  /**
   * Gets or sets the size of the file.
   * @format int64
   */
  size: number;
}

/** Relay agent configuration options. */
export interface ApiRelayAgentConfigurationOptions {
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
export interface ApiRelayControllerConfigurationOptions {
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

/** Relay options. */
export interface ApiRelayOptions {
  /** Gets the agent configuration. */
  agents?: Record<string, ApiRelayAgentConfigurationOptions>;
  /** Relay controller configuration options. */
  controller: ApiRelayControllerConfigurationOptions;
  /** Gets a value indicating whether the relay is enabled. */
  enabled: boolean;
  /** Gets the relay mode. */
  mode?: string | null;
}

export type ApiResponsesDetailData = unknown;

/** Retention options. */
export interface ApiRetentionOptions {
  /** File retention options. */
  files: ApiFileRetentionOptions;
  /**
   * Gets the time to retain logs, in days.
   * @format int32
   * @min 1
   * @max 2147483647
   */
  logs: number;
  /** Transfer retention options. */
  transfers: ApiTransferRetentionOptions;
}

export interface ApiRoom {
  /** A value indicating whether the room is private. */
  isPrivate: boolean;
  /** The list of messages. */
  messages?: ApiRoomMessage[] | null;
  /** The room name. */
  name?: string | null;
  /**
   * The number of operators in the room, if private.
   * @format int32
   */
  operatorCount?: number | null;
  /** The operators in the room, if private. */
  operators?: string[] | null;
  /** The owner of the room, if private. */
  owner?: string | null;
  /** The list of users in the room. */
  users?: ApiUserData[] | null;
}

export interface ApiRoomInfo {
  name?: string | null;
  /** @format int32 */
  userCount: number;
  readonly users?: string[] | null;
}

/** A message sent to a room. */
export interface ApiRoomMessage {
  direction: ApiMessageDirection;
  /** The message. */
  message?: string | null;
  /** The room to which the message pertains. */
  roomName?: string | null;
  /**
   * The timestamp of the message.
   * @format date-time
   */
  timestamp: string;
  /** The username of the user who sent the message. */
  username?: string | null;
}

/** Search filter options. */
export interface ApiSearchOptions {
  /** Gets the list of search request filters. */
  request?: string[] | null;
}

/** A search request. */
export interface ApiSearchRequest {
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
  searchText?: string | null;
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

export type ApiSearchesCreateData = unknown;

export type ApiSearchesDeleteData = unknown;

export type ApiSearchesDetailData = unknown;

export type ApiSearchesListData = unknown;

export type ApiSearchesUpdateData = unknown;

export type ApiServerDeleteData = unknown;

export type ApiServerListData = ApiServerState;

export interface ApiServerState {
  address?: string | null;
  ipEndPoint: ApiIPEndPoint;
  readonly isConnected: boolean;
  readonly isLoggedIn: boolean;
  readonly isTransitioning: boolean;
  state: ApiSoulseekClientStates;
  username?: string | null;
}

export type ApiServerUpdateData = unknown;

export type ApiSessionCreateData = ApiTokenResponse;

export type ApiSessionListData = unknown;

/** A file share. */
export interface ApiShare {
  alias?: string | null;
  /** @format int32 */
  directories?: number | null;
  /** @format int32 */
  files?: number | null;
  id?: string | null;
  isExcluded: boolean;
  localPath?: string | null;
  raw?: string | null;
  remotePath?: string | null;
}

/** Share caching options. */
export interface ApiShareCacheOptions {
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

export type ApiSharesDeleteData = unknown;

export type ApiSharesDetailData = ApiShare;

export type ApiSharesListData = Record<string, ApiShare[]>;

/** Share options. */
export interface ApiSharesOptions {
  /** Share caching options. */
  cache: ApiShareCacheOptions;
  /** Gets the list of paths to shared files. */
  directories?: string[] | null;
  /** Gets the list of shared file filters. */
  filters?: string[] | null;
}

export type ApiSharesUpdateData = unknown;

export enum ApiSoulseekClientStates {
  None = "None",
  Disconnected = "Disconnected",
  Connected = "Connected",
  LoggedIn = "LoggedIn",
  Connecting = "Connecting",
  LoggingIn = "LoggingIn",
  Disconnecting = "Disconnecting",
}

/** Soulseek client options. */
export interface ApiSoulseekOptions {
  /** Gets the address of the Soulseek server. */
  address?: string | null;
  /** Connection options. */
  connection: ApiConnectionOptions;
  /** Gets the description of the Soulseek user. */
  description?: string | null;
  diagnosticLevel: ApiDiagnosticLevel;
  /** Distributed network options. */
  distributedNetwork: ApiDistributedNetworkOptions;
  /** Gets the local IP address on which to listen for incoming connections. */
  listenIpAddress?: string | null;
  /**
   * Gets the port on which to listen for incoming connections.
   * @format int32
   * @min 1024
   * @max 65535
   */
  listenPort: number;
  /** Gets the password for the Soulseek network. */
  password?: string | null;
  /**
   * Gets the port of the Soulseek server.
   * @format int32
   * @min 1024
   * @max 65535
   */
  port: number;
  /** Gets the username for the Soulseek network. */
  username?: string | null;
}

export type ApiStartupListData = ApiOptions;

/** User status. */
export interface ApiStatus {
  /** Gets a value indicating whether the user is privileged. */
  isPrivileged: boolean;
  presence: ApiUserPresence;
}

export type ApiStatusDetailData = ApiStatus;

/** Leecher threshold options. */
export interface ApiThresholdOptions {
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

/** Connection timeout options. */
export interface ApiTimeoutOptions {
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

export interface ApiTokenResponse {
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
  readonly name?: string | null;
  /**
   * Gets the value of the Not Before claim from the Access Token.
   * @format int64
   */
  readonly notBefore: number;
  /** Gets the Access Token string. */
  readonly token?: string | null;
  /** Gets the Token type. */
  readonly tokenType?: string | null;
}

/** A single file transfer. */
export interface ApiTransfer {
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
  direction: ApiTransferDirection;
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
  exception?: string | null;
  /** Gets the filename of the file to be transferred. */
  filename?: string | null;
  /** Gets the transfer id. */
  readonly id?: string | null;
  ipEndPoint: ApiIPEndPoint;
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
  state: ApiTransferStates;
  /**
   * Gets the unique token for the transfer.
   * @format int32
   */
  token: number;
  /** Gets the username of the peer to or from which the file is to be transferred. */
  username?: string | null;
}

export enum ApiTransferDirection {
  Download = "Download",
  Upload = "Upload",
}

/** Transfer retention options. */
export interface ApiTransferRetentionOptions {
  /** Transfer retention options. */
  download: ApiTransferTypeRetentionOptions;
  /** Transfer retention options. */
  upload: ApiTransferTypeRetentionOptions;
}

export enum ApiTransferStates {
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

/** Transfer retention options. */
export interface ApiTransferTypeRetentionOptions {
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

/** User group upload options. */
export interface ApiUploadOptions {
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

export type ApiUploadsAllCompletedDeleteData = unknown;

export type ApiUploadsDeleteData = unknown;

export type ApiUploadsDetail2Data = unknown;

export type ApiUploadsDetailData = unknown;

export type ApiUploadsListData = unknown;

export interface ApiUserData {
  /** @format int32 */
  averageSpeed: number;
  countryCode?: string | null;
  /** @format int32 */
  directoryCount: number;
  /** @format int32 */
  fileCount: number;
  /** @format int32 */
  slotsFree?: number | null;
  status: ApiUserPresence;
  /** @format int64 */
  uploadCount: number;
  username?: string | null;
}

/** User defined user group options. */
export interface ApiUserDefinedOptions {
  /** Upload limit options. */
  limits: ApiLimitsOptions;
  /** Gets the list of group member usernames. */
  members?: string[] | null;
  /** User group upload options. */
  upload: ApiUploadOptions;
}

export enum ApiUserPresence {
  Offline = "Offline",
  Away = "Away",
  Online = "Online",
}

export type ApiVersionLatestListData = unknown;

export type ApiVersionListData = unknown;

/** Authentication options. */
export interface ApiWebAuthenticationOptions {
  /** Gets API keys. */
  apiKeys?: Record<string, ApiApiKeyOptions>;
  /** Gets a value indicating whether authentication should be disabled. */
  disabled: boolean;
  /** JWT options. */
  jwt: ApiJwtOptions;
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

/** Web server options. */
export interface ApiWebOptions {
  /** Authentication options. */
  authentication: ApiWebAuthenticationOptions;
  /**
   * Gets the path to static web content.
   * @minLength 1
   * @maxLength 255
   */
  contentPath?: string | null;
  /** HTTPS options. */
  https: ApiHttpsOptions;
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
  urlBase?: string | null;
}

export type ApiYamlCreateData = unknown;

export type ApiYamlListData = unknown;

export type ApiYamlLocationListData = unknown;

export type ApiYamlValidateCreateData = unknown;
