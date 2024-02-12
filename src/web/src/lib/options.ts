import api from './api';
import {
  type ApiDebugListData,
  type ApiOptionsListData,
  type ApiYamlCreateData,
  type ApiYamlListData,
  type ApiYamlLocationListData,
  type ApiYamlValidateCreateData,
} from './generated/types';

export const getCurrent = async () => {
  return (await api.get<ApiOptionsListData>('/options')).data;
};

export const getCurrentDebugView = async () => {
  return (await api.get<ApiDebugListData>('/options/debug')).data;
};

export const getYaml = async () => {
  return (await api.get<ApiYamlListData>('/options/yaml')).data;
};

export const getYamlLocation = async () => {
  return (await api.get<ApiYamlLocationListData>('/options/yaml/location'))
    .data;
};

export const validateYaml = async ({ yaml }: { yaml: string }) => {
  return (
    await api.post<ApiYamlValidateCreateData>('/options/yaml/validate', yaml)
  ).data;
};

export const updateYaml = async ({ yaml }: { yaml: string }) => {
  return (await api.post<ApiYamlCreateData>('/options/yaml', yaml)).data;
};
