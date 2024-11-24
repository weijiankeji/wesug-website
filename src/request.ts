import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.wesug.cn', // 你的API基础URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const userInfo = JSON.parse(localStorage.getItem('user-info') || '{}');
    const token = userInfo.accessToken;
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查是否需要存储token
    if (response.config.url === '/user/login' || response.config.url === '/refreshToken') {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('user-info', JSON.stringify({ accessToken, refreshToken }));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 刷新token
        const userInfo = JSON.parse(localStorage.getItem('user-info') || '{}');
        const refreshToken = userInfo.refreshToken;
        if (refreshToken) {
          const res = await instance.post('/refreshToken', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          localStorage.setItem('user-info', JSON.stringify({ accessToken, refreshToken: newRefreshToken }));

          // 重新设置请求头
          originalRequest.headers!.Authorization = `Bearer ${accessToken}`;

          // 重新发起请求
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // 处理刷新token失败的情况
        console.error('Failed to refresh token:', refreshError);
        // 可以在这里跳转到登录页面或提示用户重新登录
      }
    }

    return Promise.reject(error);
  }
);

// 封装通用的request方法
export const request = (method: 'GET' | 'POST', url: string, data?: any) => {
  return instance({
    method,
    url,
    [method === 'GET' ? 'params' : 'data']: data,
  });
};

// 导出axios实例
export default instance;