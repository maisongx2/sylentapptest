import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import type { Dispatch } from '@reduxjs/toolkit';
import { authActions } from '../../../src/store/modules/auth/authActions';
import { IApplicationState } from '../../store/rootTypes';

const BASE_URL_AUTH = 'http://ec2-54-85-252-46.compute-1.amazonaws.com:8080';
const BASE_URL_TUYA = 'http://ec2-54-85-252-46.compute-1.amazonaws.com:8081';

export const authApi: AxiosInstance = axios.create({
  baseURL: `${BASE_URL_AUTH}/ms-auth`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const mainApi: AxiosInstance = axios.create({
  baseURL: `${BASE_URL_AUTH}/ms-principal`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const tuyaApi: AxiosInstance = axios.create({
  baseURL: `${BASE_URL_TUYA}/ms-tuya-cloud`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function setAuthHeader(token?: string) {
  if (token) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    mainApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    tuyaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common.Authorization;
    delete mainApi.defaults.headers.common.Authorization;
    delete tuyaApi.defaults.headers.common.Authorization;
  }
}

let redux: { dispatch: Dispatch; getState: () => IApplicationState } | null =
  null;

export function attachRedux(params: {
  dispatch: Dispatch;
  getState: () => IApplicationState;
}) {
  redux = params;
}

type TResolver = {
  resolve: (ok: boolean) => void;
  reject: (err?: any) => void;
};

const RefreshManager = {
  isRefreshing: false,
  queue: [] as TResolver[],
  wait(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject });
    });
  },
  resolveAll(ok: boolean) {
    this.queue.forEach(p => (ok ? p.resolve(true) : p.resolve(false)));
    this.queue = [];
    this.isRefreshing = false;
  },
  rejectAll(err?: any) {
    this.queue.forEach(p => p.reject(err));
    this.queue = [];
    this.isRefreshing = false;
  },
};
export { RefreshManager };

function setupInterceptors(api: AxiosInstance) {
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const state = redux?.getState();
    const token = state?.Auth.tokens?.accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (AxiosRequestConfig & { _retry?: boolean })
        | undefined;

      const status = error.response?.status;

      const isAuthRoute =
        originalRequest?.url?.includes('/auth/validate') ||
        originalRequest?.url?.includes('/auth/refresh') ||
        originalRequest?.url?.includes('/auth/login');

      if (status === 401 && !originalRequest?._retry && !isAuthRoute) {
        originalRequest!._retry = true;

        try {
          if (!RefreshManager.isRefreshing) {
            RefreshManager.isRefreshing = true;
            redux?.dispatch(authActions.refreshTokenRequest());
          }

          const ok = await RefreshManager.wait();
          if (!ok) {
            return Promise.reject(error);
          }

          return api(originalRequest!);
        } catch (e) {
          return Promise.reject(e);
        }
      }

      return Promise.reject(error);
    },
  );
}

setupInterceptors(authApi);
setupInterceptors(mainApi);
setupInterceptors(tuyaApi);
