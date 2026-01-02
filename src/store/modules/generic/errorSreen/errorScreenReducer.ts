import {
  ErrorScreenAction,
  IErrorScreenState,
  EErrorScreenActionTypes,
  IErrorScreenReducer,
} from './errorScreenTypes';

const INITIAL_STATE: IErrorScreenState = {
  data: null,
};

const setErrorScreen: IErrorScreenReducer = (
  state: IErrorScreenState,
  action: ErrorScreenAction,
): IErrorScreenState => ({
  ...state,
  data: action.payload?.data ?? null,
});

const reducerMap = new Map<EErrorScreenActionTypes, IErrorScreenReducer>([
  [EErrorScreenActionTypes.SET_ERROR_SCREEN, setErrorScreen],
]);

export default (
  state = INITIAL_STATE,
  action = {} as ErrorScreenAction,
): IErrorScreenState => {
  const reducer = reducerMap.get(action.type);
  if (reducer) {
    return reducer(state, action);
  }
  return state;
};
