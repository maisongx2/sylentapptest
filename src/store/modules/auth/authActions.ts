import {
  AuthAction,
  EAuthActionTypes,
  IAuthTokens,
  IAuthUser,
  ILoginData,
} from './authTypes';

const loginRequest = (loginData: ILoginData): AuthAction => ({
  type: EAuthActionTypes.LOGIN,
  payload: { loginData },
});

const logoutRequest = (): AuthAction => ({
  type: EAuthActionTypes.LOGOUT,
});

const restoreSessionRequest = (): AuthAction => ({
  type: EAuthActionTypes.RESTORE_SESSION,
});

const refreshTokenRequest = (): AuthAction => ({
  type: EAuthActionTypes.REFRESH_TOKEN,
});

const setUser = (user: IAuthUser, tokens: IAuthTokens): AuthAction => ({
  type: EAuthActionTypes.SET_USER,
  payload: { user, tokens, isAuthenticated: true, loading: false, error: null },
});

const setLoading = (loading: boolean): AuthAction => ({
  type: EAuthActionTypes.SET_LOADING,
  payload: { loading },
});

const setError = (error: string | null): AuthAction => ({
  type: EAuthActionTypes.SET_ERROR,
  payload: { error, loading: false },
});

const clearAuth = (): AuthAction => ({
  type: EAuthActionTypes.CLEAR_AUTH,
});

export const authActions = {
  loginRequest,
  logoutRequest,
  restoreSessionRequest,
  refreshTokenRequest,
  setUser,
  setLoading,
  setError,
  clearAuth,
};
