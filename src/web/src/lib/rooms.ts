import api from './api';

export const getAvailable = async () => {
  const response = (await api.get<unknown[]>('/rooms/available')).data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from rooms API', response);
    return undefined;
  }

  return response;
};

export const getJoined = async () => {
  const response = (await api.get<unknown>('/rooms/joined')).data;

  if (!Array.isArray(response)) {
    console.warn('got non-array response from rooms API', response);
    return undefined;
  }

  return response;
};

export const getMessages = async ({ roomName }: { roomName: string }) => {
  const response = (
    await api.get<unknown>(
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
    await api.get<unknown>(
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
  return await api.post<unknown>('/rooms/joined', roomName);
};

export const leave = async ({ roomName }: { roomName: string }) => {
  return await api.delete<unknown>(
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
  return await api.post<unknown>(
    `/rooms/joined/${encodeURIComponent(roomName)}/messages`,
    JSON.stringify(message),
  );
};
