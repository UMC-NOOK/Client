import axios from 'axios';
import useLoginStore from '../store/sign-in/useLoginStore';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    accept: 'application/json',
  },

  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          isRefreshing = false;
          localStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          useLoginStore.getState().setLogin(false);
          window.location.href = '/login';
          return Promise.reject(error);
        }

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/users/reissue`,
            {
              refreshToken,
            },
          );

          const newAccessToken = data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          useLoginStore.getState().setLogin(true);

          onTokenRefreshed(newAccessToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          useLoginStore.getState().setLogin(false);
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
