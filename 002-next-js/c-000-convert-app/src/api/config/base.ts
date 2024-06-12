import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './config';

const baseAPI = (url: string, options?: AxiosRequestConfig) => {
  return axios.create({ baseURL: url, ...options });
};

export const baseInstance = baseAPI(BASE_URL);
