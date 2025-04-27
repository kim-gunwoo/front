import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../config';

export class ApiInstance {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl ?? BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
