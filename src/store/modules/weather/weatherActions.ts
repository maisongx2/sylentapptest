import {
  WeatherAction,
  EWeatherActionTypes,
  WeatherData,
} from './weatherTypes';

/**
 * Dispara busca do clima
 */
const fetchWeatherRequest = (params: {
  latitude?: number;
  longitude?: number;
  city?: string;
}): WeatherAction => ({
  type: EWeatherActionTypes.FETCH_WEATHER_REQUEST,
  payload: params,
});

/**
 * Sucesso ao buscar clima
 */
const fetchWeatherSuccess = (data: WeatherData): WeatherAction => ({
  type: EWeatherActionTypes.FETCH_WEATHER_SUCCESS,
  payload: { data },
});

/**
 * Erro ao buscar clima
 */
const fetchWeatherFailure = (error: string): WeatherAction => ({
  type: EWeatherActionTypes.FETCH_WEATHER_FAILURE,
  payload: { error },
});

/**
 * Limpa dados do clima
 */
const clearWeather = (): WeatherAction => ({
  type: EWeatherActionTypes.CLEAR_WEATHER,
});

export const weatherActions = {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  clearWeather,
};
