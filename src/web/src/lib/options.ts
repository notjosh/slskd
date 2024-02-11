import api from './api';

export const getCurrent = async () => {
  return (await api.get<unknown>('/options')).data;
};

export const getCurrentDebugView = async () => {
  return (await api.get<unknown>('/options/debug')).data;
};

export const getYaml = async () => {
  return (await api.get<unknown>('/options/yaml')).data;
};

export const getYamlLocation = async () => {
  return (await api.get<unknown>('/options/yaml/location')).data;
};

export const validateYaml = async ({ yaml }: { yaml: string }) => {
  return (await api.post<unknown>('/options/yaml/validate', yaml)).data;
};

export const updateYaml = async ({ yaml }: { yaml: string }) => {
  return (await api.post<unknown>('/options/yaml', yaml)).data;
};
