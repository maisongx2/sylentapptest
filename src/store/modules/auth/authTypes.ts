export enum EAuthActionTypes {
  LOGIN = '@auth/LOGIN',
  LOGOUT = '@auth/LOGOUT',
  RESTORE_SESSION = '@auth/RESTORE_SESSION',
  REFRESH_TOKEN = '@auth/REFRESH_TOKEN',
  SET_USER = '@auth/SET_USER',
  SET_LOADING = '@auth/SET_LOADING',
  SET_ERROR = '@auth/SET_ERROR',
  CLEAR_AUTH = '@auth/CLEAR_AUTH',
}

export interface IValidadeToken {
  success: boolean;
  statusCode: number;
  timestamp: Date;
  path: string;
  method: string;
  message: string;
  details: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthState {
  user: IAuthUser | null;
  tokens: IAuthTokens | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export type UserPayload = {
  user?: IAuthUser;
  loginData?: ILoginData;
  tokens?: IAuthTokens | null;
  isAuthenticated?: boolean;
  loading?: boolean;
  error?: string | null;
};

export type AuthAction = {
  type: EAuthActionTypes;
  payload?: UserPayload;
};

export type IAuthReducer = (
  state: IAuthState,
  action: AuthAction,
) => IAuthState;

export interface ILoginResponse {
  requiresTwoFactor: boolean;
  user: IAuthUser;
  tokens: IAuthTokens;
  sessionId: string;
}
export interface IAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}
export interface IAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  loginCount: number;
  lastLoginAt: string;
  fullName?: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  avatarThumbnailUrl?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  roles?: string[];
  permissions?: string[];
}
