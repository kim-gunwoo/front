import axios from "axios";

class HttpInstance {
  private static DEFAULT_URL = "";
  private static TIME_OUT = 3000;
  private static REFRESH_URL = "/refresh"
 

  static createInstance(baseUrl?: string) {
    const instance = axios.create({
      baseURL: baseUrl ? baseUrl : HttpInstance.DEFAULT_URL,
      timeout: HttpInstance.TIME_OUT,
    });

    const REFRESH_URL = "/refresh"
    const getRefreshToken = async (): Promise<string | void> => {
      try {
        const { data: { accessToken, refreshToken } } = await instance.get<{ accessToken: string; refreshToken: string | null }>(REFRESH_URL);

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

    instance.interceptors.request.use(
      async (config) => {
        if (!config.headers) return config;

        let token: string | null = null;
      
        if (config.url === REFRESH_URL) {
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

    instance.interceptors.response.use(
      (response) => {
          return response.data;
      },
      async err => {
          const { config, response: { status } } = err;
           /** 1 */
          if (config.url === REFRESH_URL || status !== 401 || config.sent) {
            return Promise.reject(err);
          }
    
          /** 2 */
          config.sent = true;
          const accessToken = await getRefreshToken();
    
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
    
          return axios(config);
      },
    );

    return instance;
  }
}


const httpInstance =  HttpInstance.createInstance();

export { HttpInstance, httpInstance }

