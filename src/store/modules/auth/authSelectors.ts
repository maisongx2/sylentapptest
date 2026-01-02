import { IApplicationState } from '@store/rootTypes';
import { IAuthState, IAuthUser, IAuthTokens } from './authTypes';

const getState = (state: IApplicationState): IAuthState => {
  return state.Auth;
};

const getUser = (state: IApplicationState): IAuthUser | null =>
  getState(state).user;

const getTokens = (state: IApplicationState): IAuthTokens | null =>
  getState(state).tokens;

const getIsAuthenticated = (state: IApplicationState): boolean =>
  getState(state).isAuthenticated;

const getLoading = (state: IApplicationState): boolean =>
  getState(state).loading;

const getError = (state: IApplicationState): string | null =>
  getState(state).error;

export const authSelectors = {
  getState,
  getUser,
  getTokens,
  getIsAuthenticated,
  getLoading,
  getError,
};
