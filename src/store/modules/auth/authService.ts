import { authApi } from '@services/api/client';
import type {
  IAuthTokens,
  ILoginResponse,
  ILoginData,
  IAuthUser,
} from './authTypes';

async function login(loginData: ILoginData): Promise<ILoginResponse> {
  const res = await authApi.post<ILoginResponse>('/auth/login', loginData);
  console.log('🚀 ~ login ~ res:', res);
  return res.data;
}

async function logout(): Promise<void> {
  await authApi.post('/auth/logout');
}

async function refreshToken(refreshToken?: string): Promise<IAuthTokens> {
  const response = await authApi.post<IAuthTokens>('/auth/refresh', {
    refreshToken: refreshToken,
  });
  return response.data;
}

async function validateToken(token: string): Promise<boolean> {
  try {
    await authApi.get('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function getProfile(): Promise<IAuthUser> {
  const response = await authApi.get('/auth/profile');
  console.log('🚀 ~ getProfile ~ response:', response.data);

  return response.data;
}

const authService = {
  login,
  logout,
  refreshToken,
  validateToken,
  getProfile,
};

export default authService;
