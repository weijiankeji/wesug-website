import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Function to determine if we're in Lovable environment
const isLovableEnvironment = () => {
  const hostname = window.location.hostname;
  return hostname.includes('lovable.dev') || 
         hostname.includes('lovableproject.com')
};

// Create axios instance with dynamic baseURL
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' && !isLovableEnvironment()  ? 'http://localhost:3000' : 'https://api.wesug.cn',
  timeout: 10000,
});

// Request interceptors
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

// Response interceptors
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if token needs to be stored
    if (response.config.url === '/user/login' || response.config.url === '/user/register') {
      const { accessToken, refreshToken, username } = response.data;
      localStorage.setItem('user-info', JSON.stringify({ accessToken, refreshToken, username }));
    } else if (response.config.url === '/refreshToken') {
      const userInfo = JSON.parse(localStorage.getItem('user-info') || '{}');
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('user-info', JSON.stringify({ 
        ...userInfo,
        accessToken, 
        refreshToken 
      }));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token
        const userInfo = JSON.parse(localStorage.getItem('user-info') || '{}');
        const refreshToken = userInfo.refreshToken;
        if (refreshToken) {
          const res = await instance.post('/refreshToken', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          localStorage.setItem('user-info', JSON.stringify({ 
            ...userInfo,
            accessToken, 
            refreshToken: newRefreshToken 
          }));

          // Reset request headers
          originalRequest.headers!.Authorization = `Bearer ${accessToken}`;

          // Re-initiate request
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure
        console.error('Failed to refresh token:', refreshError);
        // Handle user redirecting to login or other actions here
      }
    }

    return Promise.reject(error);
  }
);

// Encapsulate a general request method
export const request = (method: 'GET' | 'POST', url: string, data?: any) => {
  return instance({
    method,
    url,
    [method === 'GET' ? 'params' : 'data']: data,
  });
};

// Export axios instance
export default instance;