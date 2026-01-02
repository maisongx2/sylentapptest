import {
  AuthAction,
  IAuthState,
  EAuthActionTypes,
  IAuthReducer,
} from './authTypes';

const INITIAL_STATE: IAuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const setUserReducer: IAuthReducer = (
  state: IAuthState,
  action: AuthAction,
): IAuthState => ({
  ...state,
  user: action.payload?.user ?? null,
  tokens: action.payload?.tokens ?? null,
  isAuthenticated: true,
  loading: false,
  error: null,
});

const setLoadingReducer: IAuthReducer = (
  state: IAuthState,
  action: AuthAction,
): IAuthState => ({
  ...state,
  loading: Boolean(action.payload?.loading),
});

const setErrorReducer: IAuthReducer = (
  state: IAuthState,
  action: AuthAction,
): IAuthState => ({
  ...state,
  error: action.payload?.error ?? null,
  loading: false,
});

const clearAuthReducer: IAuthReducer = (): IAuthState => ({
  ...INITIAL_STATE,
});

const reducerMap = new Map<EAuthActionTypes, IAuthReducer>([
  [EAuthActionTypes.SET_USER, setUserReducer],
  [EAuthActionTypes.SET_LOADING, setLoadingReducer],
  [EAuthActionTypes.SET_ERROR, setErrorReducer],
  [EAuthActionTypes.CLEAR_AUTH, clearAuthReducer],
]);

export default (
  state = INITIAL_STATE,
  action = {} as AuthAction,
): IAuthState => {
  const reducer = reducerMap.get(action.type);
  if (reducer) {
    return reducer(state, action);
  }
  return state;
};