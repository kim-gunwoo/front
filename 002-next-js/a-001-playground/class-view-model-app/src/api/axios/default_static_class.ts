import axios, { AxiosInstance } from "axios";

class HttpInstance {
  private static DEFAULT_URL = "";
  private static TIME_OUT = 3000;
  private static REFRESH_URL = "/refresh"
  private static _instance: AxiosInstance;

  static interceptorsRequest() {
    this._instance.interceptors.request.use(
        async (config) => {
          if (!config.headers) return config;
  
          let token: string | null = null;
        
          if (config.url === HttpInstance.REFRESH_URL) {
            token = localStorage.getItem('refreshToken');
          } else {
            token = localStorage.getItem('accessToken');
          }
        
          if(token !== null){
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        err => {
          return Promise.reject(err);
        }
      );
  }

  static interceptorsResponse() {
    this._instance.interceptors.response.use(
      (response) => {
          return response.data;
      },
      async err => {
          const { config, response: { status } } = err;
           /** 1 */
          if (config.url === this.REFRESH_URL || status !== 401 || config.sent) {
            return Promise.reject(err);
          }
    
          /** 2 */
          config.sent = true;
          const accessToken = await this.getRefreshToken();
    
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
    
          return axios(config);
      },
    );

  }

  static getRefreshToken = async (): Promise<string | void> => {
      try {
        const { data: { accessToken, refreshToken } } = await this._instance.get<{ accessToken: string; refreshToken: string | null }>(this.REFRESH_URL);

        localStorage.setItem('accessToken', accessToken);

        if (refreshToken !== null) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        return accessToken;
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }

  static createInstance(baseUrl?: string) {
    this._instance = axios.create({
      baseURL: baseUrl ? baseUrl : HttpInstance.DEFAULT_URL,
      timeout: HttpInstance.TIME_OUT,
    });
    this.interceptorsRequest();
    this.interceptorsResponse();

    return this._instance;
  }
}

const axiosInstance =  HttpInstance.createInstance();

export {
    HttpInstance, axiosInstance,
}

