import { apiBaseUrl } from '../config';
import { clearToken, getToken, isPassthroughEnabled } from './token';
import axios, { type AxiosError } from 'axios';

axios.defaults.baseURL = apiBaseUrl;

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  config.headers['Content-Type'] = 'application/json';

  if (!isPassthroughEnabled() && token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (
      error.response != null &&
      error.response.status === 401 &&
      error.response.config.url != null &&
      !['/session', '/server', '/application'].includes(
        error.response.config.url,
      )
    ) {
      console.debug('received 401 from api route, logging out');
      clearToken();
      window.location.reload();

      throw error;
    } else {
      throw error;
    }
  },
);

export default api;
