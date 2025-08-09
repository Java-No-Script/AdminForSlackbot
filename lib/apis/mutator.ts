import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

const baseURL =
  "http://ec2-43-201-67-242.ap-northeast-2.compute.amazonaws.com:5000";

const axiosInstance = axios.create({ baseURL });

export const customInstance = <T = unknown>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): AxiosPromise<T> => {
  return axiosInstance.request<T>({ ...config, ...(options || {}) });
};

export default axiosInstance;
