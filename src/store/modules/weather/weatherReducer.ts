import {
  WeatherAction,
  IWeatherState,
  EWeatherActionTypes,
  IWeatherReducer,
} from './weatherTypes';

const INITIAL_STATE: IWeatherState = {
  data: null,
  loading: false,
  error: null,
};

const fetchWeatherRequestReducer: IWeatherReducer = (
  state: IWeatherState,
): IWeatherState => ({
  ...state,
  loading: true,
  error: null,
});

const fetchWeatherSuccessReducer: IWeatherReducer = (
  state: IWeatherState,
  action: WeatherAction,
): IWeatherState => ({
  ...state,
  data: action.payload?.data ?? null,
  loading: false,
  error: null,
});

const fetchWeatherFailureReducer: IWeatherReducer = (
  state: IWeatherState,
  action: WeatherAction,
): IWeatherState => ({
  ...state,
  loading: false,
  error: action.payload?.error ?? 'Erro ao buscar clima',
});

const clearWeatherReducer: IWeatherReducer = (): IWeatherState => ({
  ...INITIAL_STATE,
});

const reducerMap = new Map<EWeatherActionTypes, IWeatherReducer>([
  [EWeatherActionTypes.FETCH_WEATHER_REQUEST, fetchWeatherRequestReducer],
  [EWeatherActionTypes.FETCH_WEATHER_SUCCESS, fetchWeatherSuccessReducer],
  [EWeatherActionTypes.FETCH_WEATHER_FAILURE, fetchWeatherFailureReducer],
  [EWeatherActionTypes.CLEAR_WEATHER, clearWeatherReducer],
]);

export default (
  state = INITIAL_STATE,
  action = {} as WeatherAction,
): IWeatherState => {
  const reducer = reducerMap.get(action.type);
  if (reducer) {
    return reducer(state, action);
  }
  return state;
};
