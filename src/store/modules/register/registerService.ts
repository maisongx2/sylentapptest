import { authApi } from '@services/api/client';
import type { ILoginResponse } from '@store/modules/auth/authTypes';
import type { IRegisterData } from './registerTypes';

async function register(registerData: IRegisterData): Promise<ILoginResponse> {
  // TODO fix DTO here
  const { verificationCode, ...payload } = registerData;
  const res = await authApi.post<ILoginResponse>(
    '/auth/register',
    payload,
  );
  return res.data;
}

const registerService = {
  register,
};

export default registerService;
