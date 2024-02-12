import api from './api';
import {
  type ApiAvailableListData,
  type ApiJoinedCreateData,
  type ApiJoinedDeleteData,
  type ApiJoinedMessagesCreateData,
  type ApiJoinedMessagesDetailData,
  type ApiJoinedUsersDetailData,
} from './generated/types';

export const getAvailable = async () => {
  const response = (await api.get<ApiAvailableListData>('/rooms/available'))
    .data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from rooms API', response);
    return undefined;
  }

  return response;
};

export const getJoined = async () => {
  const response = (await api.get<ApiJoinedCreateData>('/rooms/joined')).data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from rooms API', response);
    return undefined;
  }

  return response;
};

export const getMessages = async ({ roomName }: { roomName: string }) => {
  const response = (
    await api.get<ApiJoinedMessagesDetailData>(
      `/rooms/joined/${encodeURIComponent(roomName)}/messages`,
    )
  ).data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from rooms API', response);
    return undefined;
  }

  return response;
};

export const getUsers = async ({ roomName }: { roomName: string }) => {
  const response = (
    await api.get<ApiJoinedUsersDetailData>(
      `/rooms/joined/${encodeURIComponent(roomName)}/users`,
    )
  ).data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from rooms API', response);
    return undefined;
  }

  return response;
};

export const join = async ({ roomName }: { roomName: string }) => {
  return await api.post<ApiJoinedCreateData>('/rooms/joined', roomName);
};

export const leave = async ({ roomName }: { roomName: string }) => {
  return await api.delete<ApiJoinedDeleteData>(
    `/rooms/joined/${encodeURIComponent(roomName)}`,
  );
};

export const sendMessage = async ({
  roomName,
  message,
}: {
  message: string;
  roomName: string;
}) => {
  return await api.post<ApiJoinedMessagesCreateData>(
    `/rooms/joined/${encodeURIComponent(roomName)}/messages`,
    JSON.stringify(message),
  );
};
