import axios, { AxiosInstance } from "axios";

class HttpInstance {
  private DEFAULT_URL = "";
  private TIME_OUT = 3000;
  private REFRESH_URL = "/refresh"
  private _instance: AxiosInstance;

  constructor(baseUrl?: string) {
    this._instance = axios.create({
      baseURL: baseUrl ? baseUrl : this.DEFAULT_URL,
      timeout: this.TIME_OUT,
    });
  
    this.requestInterceptor()
    this.responseInterceptor()
  }

  instance() {
    return this._instance;
  }

  requestInterceptor() {
    this._instance.interceptors.request.use(
        async (config) => {
          if (!config.headers) return config;
  
          let token: string | null = null;
        
          if (config.url === this.REFRESH_URL) {
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

  responseInterceptor() {
    this._instance.interceptors.response.use(
      (response) => {
          return response.data;
      },
      async err => {
          const { config, response: { status } } = err;
           
          if (config.url === this.REFRESH_URL || status !== 401 || config.sent) {
            return Promise.reject(err);
          }
    
          config.sent = true;
          const accessToken = await this.getRefreshToken();
    
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
    
          return axios(config);
      },
    );

  }

  getRefreshToken = async (): Promise<string | void> => {
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
}

export { HttpInstance }

