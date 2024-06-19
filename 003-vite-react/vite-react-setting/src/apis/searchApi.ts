/* eslint-disable no-useless-catch */
// import axios, { AxiosResponse } from 'axios';
import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:9999',
});

export interface ISearch {
  sort: 'desc' | 'asc';
  duplicate: ('yes' | 'no')[];
  keyword: string;
}

export interface ISearchRes {
  name: string;
}

customAxios.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    params.append(key, paramObj[key]);
  }

  return params.toString();
};

// const searchList = async (request: ISearch): Promise<AxiosResponse<ISearchRes[]>> => {
const searchList = async (request: ISearch) => {
  try {
    return await customAxios.get<ISearchRes[]>('/api/search', {
      params: { ...request },
    });
  } catch (e) {
    throw e;
  }
};

export { searchList };
