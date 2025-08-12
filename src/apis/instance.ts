import axios from 'axios';
import useLoginStore from '../store/sign-in/useLoginStore';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    accept: 'application/json',
  },

  withCredentials: true,
});

const refreshInstance = axios.create({
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
      (error.response.status === 401 ||
        error.response.status === 500 ||
        error.response?.data?.message?.includes('token') ||
        error.response?.data?.message?.includes('expired')) &&
      !originalRequest._retry
    ) {
      console.log('재발급 로직 시작');
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // 쿠키에 있는 리프래시 토큰이 자동으로 전송됨
          const { data } = await refreshInstance.post('api/users/reissue');

          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);

          // 새로운 리프래시 토큰이 응답에 포함되어 있다면 쿠키로 설정
          // (보통 서버에서 자동으로 Set-Cookie 헤더로 설정함)
          if (newRefreshToken) {
            // 필요시 추가 처리
          }

          useLoginStore.getState().setLogin(true);

          onTokenRefreshed(newAccessToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError: any) {
          isRefreshing = false;

          console.log('Refresh Error Details:');
          console.log('Status:', refreshError.response?.status);
          console.log('Data:', refreshError.response?.data);
          console.log('Headers:', refreshError.response?.headers);
          console.log('Request Config:', refreshError.config);

          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('accessToken');

          // 쿠키는 서버에서 제거하거나 만료시켜야 함
          // 클라이언트에서 HttpOnly 쿠키는 직접 제거 불가
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
