import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

const baseURL =
  "http://ec2-43-201-67-242.ap-northeast-2.compute.amazonaws.com:5000";

const axiosInstance = axios.create({ baseURL });

// 응답 인터셉터 추가 - 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러를 그대로 전파하여 각 mutation에서 처리할 수 있도록 함
    return Promise.reject(error);
  }
);

export const customInstance = <T = unknown>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): AxiosPromise<T> => {
  return axiosInstance.request<T>({ ...config, ...(options || {}) });
};

export default axiosInstance;
