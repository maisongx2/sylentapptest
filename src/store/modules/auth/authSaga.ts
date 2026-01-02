import { call, put, select, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthHeader, RefreshManager } from '../../../services/api/client';
import { authActions } from './authActions';
import { authSelectors } from './authSelectors';
import {
  AuthAction,
  EAuthActionTypes,
  IAuthTokens,
  IAuthUser,
  ILoginResponse,
} from './authTypes';
import authService from './authService';
import { authNav, nav } from '@navigation/helpers/navigation-helpers';
import { errorScreenActions } from '../generic/errorSreen/errorScreenActions';
import { ECallToActionActionType } from '../callToAction/callToActionTypes';
import TuyaService from '@native-modules/tuya/TuyaModule';
const STORAGE_KEYS = {
  TOKENS: '@app/auth/tokens',
  USER: '@app/auth/user',
};

function* persist(tokens: IAuthTokens, user: IAuthUser) {
  yield call(
    [AsyncStorage, 'setItem'],
    STORAGE_KEYS.TOKENS,
    JSON.stringify(tokens),
  );
  yield call(
    [AsyncStorage, 'setItem'],
    STORAGE_KEYS.USER,
    JSON.stringify(user),
  );
  yield call(setAuthHeader, tokens.accessToken);
}

function* clear() {
  yield call([AsyncStorage, 'removeItem'], STORAGE_KEYS.TOKENS);
  yield call([AsyncStorage, 'removeItem'], STORAGE_KEYS.USER);
  yield call(setAuthHeader, undefined);
}

function* loginWorker(action: AuthAction) {
  try {
    console.log('tuya call hereeeeACTION');
    yield put(authActions.setLoading(true));
    yield put(authActions.setError(null));

    yield call(authNav.toLoadingScreen);

    if (!action.payload?.loginData) {
      throw new Error('Dados de login inválidos');
    }

    const loginData = action.payload.loginData;

    // 2️⃣ Login to Tuya (hardcoded params)
    yield call(
      TuyaService.login,
      '55', // countryCode (hardcoded)
      loginData.email, // email
      loginData.password, // password
    );

    const response: ILoginResponse = yield call(authService.login, loginData);

    const { user, tokens } = response;
    yield call(persist, tokens, user);
    yield put(authActions.setUser(user, tokens));
    // TODO here add call to get homes
    nav.switchToApp();
  } catch (e: any) {
    yield put(nav.back);
    const message =
      e?.response?.data?.message || e?.message || 'Erro ao fazer login';
    yield put(
      errorScreenActions.showErrorScreen({
        title: 'Teste Header',
        description: `${message}`,
        errorCode: '15651',
        primaryButton: {
          label: 'Voltar',
          actionType: ECallToActionActionType.GO_BACK,
        },
      }),
    );
    yield put(authActions.setError(message));
  }
}

function* logoutWorker() {
  try {
    yield put(authActions.setLoading(true));
    // 1 Logout from Tuya SDK
    yield call(TuyaService.logout);
    // 2 internal logout
    yield call(authService.logout);
    yield call(clear);
    yield put(authActions.clearAuth());
    nav.switchToAuth();
  } catch (e: any) {
    yield call(clear);
    yield put(authActions.clearAuth());
    nav.switchToAuth();
  } finally {
    yield put(authActions.setLoading(false));
  }
}

function* restoreWorker() {
  try {
    yield put(authActions.setLoading(true));

    const rawT: string | null = yield call(
      [AsyncStorage, 'getItem'],
      STORAGE_KEYS.TOKENS,
    );
    const rawU: string | null = yield call(
      [AsyncStorage, 'getItem'],
      STORAGE_KEYS.USER,
    );

    if (!rawT || !rawU) {
      yield put(authActions.clearAuth());
      return;
    }

    const tokens: IAuthTokens = JSON.parse(rawT);
    const user: IAuthUser = JSON.parse(rawU);

    const isValid: boolean = yield call(
      authService.validateToken,
      tokens.accessToken,
    );

    if (isValid) {
      yield call(persist, tokens, user);
      yield put(authActions.setUser(user, tokens));
    } else {
      if (tokens.refreshToken) {
        try {
          const newTokens: IAuthTokens = yield call(
            authService.refreshToken,
            tokens.refreshToken,
          );

          yield call(persist, newTokens, user);
          yield put(authActions.setUser(user, newTokens));
        } catch (refreshError) {
          console.log('🚀 ~ restoreWorker ~ refreshError:', refreshError);
          yield call(clear);
          yield put(authActions.clearAuth());
        }
      } else {
        yield call(clear);
        yield put(authActions.clearAuth());
      }
    }
  } catch (e) {
    console.log('🚀 ~ restoreWorker ~ e:', e);
    yield put(authActions.clearAuth());
  } finally {
    yield put(authActions.setLoading(false));
  }
}

function* refreshWorker() {
  try {
    const tokens: IAuthTokens | null = yield select(authSelectors.getTokens);
    let refreshToken = tokens?.refreshToken;

    if (!refreshToken) {
      const raw: string | null = yield call(
        [AsyncStorage, 'getItem'],
        STORAGE_KEYS.TOKENS,
      );
      if (raw) refreshToken = (JSON.parse(raw) as IAuthTokens).refreshToken;
    }

    if (!refreshToken) {
      RefreshManager.resolveAll(false);
      yield put(authActions.clearAuth());
      nav.switchToAuth();
      return;
    }

    const newTokens: IAuthTokens = yield call(
      authService.refreshToken,
      refreshToken,
    );

    const user: IAuthUser | null = yield select(authSelectors.getUser);

    if (user) {
      yield call(persist, newTokens, user);
      yield put(authActions.setUser(user, newTokens));
    }

    RefreshManager.resolveAll(true);
  } catch (e: any) {
    RefreshManager.resolveAll(false);
    yield call(clear);
    yield put(authActions.clearAuth());
    nav.switchToAuth();
  }
}

export default [
  takeLatest(EAuthActionTypes.LOGIN, loginWorker),
  takeLatest(EAuthActionTypes.LOGOUT, logoutWorker),
  takeLatest(EAuthActionTypes.RESTORE_SESSION, restoreWorker),
  takeLatest(EAuthActionTypes.REFRESH_TOKEN, refreshWorker),
];
