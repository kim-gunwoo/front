import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { CONFIG } from './config';
import { GuestApi } from '../guest';

const onRequest = async (config: InternalAxiosRequestConfig) => {
  const token = GuestApi.getAccessToken();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

const onErrorResponce = async (error: AxiosError) => {
  if (error.response) {
    if ([401, 422].includes(error.response.status)) {
      try {
        await GuestApi.login();
      } catch (error) {
        throw error;
      }
    }
  }

  return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponse, onErrorResponce);
  return instance;
};

export const guestInstance = setupInterceptors(axios.create({ baseURL: CONFIG.DEFAULT_URL, timeout: CONFIG.TIME_OUT }));
