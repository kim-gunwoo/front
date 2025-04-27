import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '../config';

export class AuthApiInstance {
  private static instance: AuthApiInstance;
  private axiosInstance: AxiosInstance;

  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터 설정
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // 토큰을 추가하거나 기타 설정 변경
        const accessToken = sessionStorage.getItem('access_token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // 응답 인터셉터 설정
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        /**
        if (error.response && error.response.status === 422 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await this.refreshToken();
          if (newToken) {
            sessionStorage.setItem('access_token', newToken.access_token);
            originalRequest.headers.Authorization = `Bearer ${newToken.access_token}`;
            return this.axiosInstance(originalRequest);
          }
        }
        */

        if (error.response && error.response.status === 422) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
              const newToken = await this.refreshToken();
              this.isRefreshing = false;
              if (newToken) {
                this.refreshSubscribers.unshift((token) => {
                  Promise.resolve(this.addInstance(originalRequest, token));
                });
                this.onRrefreshed(newToken.access_token);
              }
            } catch (e) {
              return Promise.reject(e);
            }
          }

          return new Promise((resolve) => {
            this.refreshSubscribers.push((token) => {
              resolve(this.addInstance(originalRequest, token));
            });
          });
        }
        return Promise.reject(error);
      },
    );
  }

  private addInstance(originalRequest: AxiosRequestConfig, token: string): Promise<AxiosResponse> {
    if (!originalRequest.headers) {
      originalRequest.headers = {};
    }
    originalRequest.headers['Authorization'] = `Bearer ${token}`;
    return this.axiosInstance(originalRequest);
  }

  private onRrefreshed(newAccessToken: string) {
    this.refreshSubscribers.map((callback: (token: string) => void) => callback(newAccessToken));
    this.refreshSubscribers = [];
  }

  public static getInstance(): AxiosInstance {
    if (!AuthApiInstance.instance) {
      AuthApiInstance.instance = new AuthApiInstance();
    }
    return AuthApiInstance.instance.axiosInstance;
  }

  private async refreshToken(): Promise<{ access_token: string } | null> {
    try {
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response: AxiosResponse<{ access_token: string; refresh_token: string }> = await axios.put(
        'https://development.passorder.me:9999/v2/users/authentication',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );
      sessionStorage.setItem('access_token', response.data.access_token);
      return response.data;
    } catch (error) {
      console.error('Error refreshing token', error);
      return null;
    }
  }
}
