import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = '';

const baseAPI = (url: string, options?: AxiosRequestConfig) => {
    return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: AxiosRequestConfig) => {
    return axios.create({ baseURL: url, ...options });
};

const setTokenHeader = (config: InternalAxiosRequestConfig) => {
    const accessToken = ''

    if (accessToken) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    return config;
};

export const baseInstance = baseAPI(BASE_URL);
export const authInstance = authAPI(BASE_URL);

authInstance.interceptors.request.use(setTokenHeader);
authInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error;

        if (status === 401) {
            const refreshToken = '';

            try {
                const { data } = await axios({
                    method: 'get',
                    url: BASE_URL + `refresh token url`,
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });
                if (data) {
                    //   setCookie('access-token', data);
                    //   config.headers['Authorization'] = `Bearer ${getCookie('access-token')}`;
                    return authInstance.request(config);
                }
            } catch (error) {
                // console.log(error);
            }
        }
        return Promise.reject(error);
    }
);