import { homesMock } from './mock/placesManarMock';
import {
  PlacesManagerAction,
  IPlacesManagerState,
  EPlacesManagerActionTypes,
  IPlacesManagerReducer,
} from './placesManagerTypes';

const INITIAL_STATE: IPlacesManagerState = {
  data: {
    homes: homesMock,
    selectedHome: undefined,
  },
  isLoading: false,
  isError: false,
};

const setDataReducer: IPlacesManagerReducer = (
  state: IPlacesManagerState,
  action: PlacesManagerAction,
): IPlacesManagerState => {
  if (!action.payload?.data) return state;

  return {
    ...state,
    data: action.payload.data,
  };
};

const setLoadingReducer: IPlacesManagerReducer = (
  state: IPlacesManagerState,
  action: PlacesManagerAction,
): IPlacesManagerState => {
  return {
    ...state,
    isLoading: action.payload?.isLoading ?? false,
  };
};

const setErrorReducer: IPlacesManagerReducer = (
  state: IPlacesManagerState,
  action: PlacesManagerAction,
): IPlacesManagerState => {
  return {
    ...state,
    isError: action.payload?.isError ?? false,
  };
};

const selectHomeReducer: IPlacesManagerReducer = (
  state: IPlacesManagerState,
  action: PlacesManagerAction,
): IPlacesManagerState => {
  return {
    ...state,
    data: {
      ...state.data,
      selectedHome: action.payload?.home,
    },
  };
};

const reducerMap = new Map<EPlacesManagerActionTypes, IPlacesManagerReducer>([
  [EPlacesManagerActionTypes.SET_DATA, setDataReducer],
  [EPlacesManagerActionTypes.SET_LOADING, setLoadingReducer],
  [EPlacesManagerActionTypes.SET_ERROR, setErrorReducer],
  [EPlacesManagerActionTypes.SELECT_HOME, selectHomeReducer],
]);

export default (
  state = INITIAL_STATE,
  action = {} as PlacesManagerAction,
): IPlacesManagerState => {
  const reducer = reducerMap.get(action.type);
  if (reducer) {
    return reducer(state, action);
  }
  return state;
};
