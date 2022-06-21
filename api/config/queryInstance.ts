import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "axios";

const makeQuery = () => {
  const queryInstanceOptions = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  };
  return axios.create(queryInstanceOptions);
};

export const createQueryInstance = {
  get: function (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return makeQuery().get(url, config);
  },
  post: function <T>(
    url: string,
    body: T,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return makeQuery().post(url, body, config);
  },

  put: function <T>(
    url: string,
    body: T,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return makeQuery().put(url, body, config);
  },

  delete: function (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return makeQuery().delete(url, config);
  },
};

export default createQueryInstance;
