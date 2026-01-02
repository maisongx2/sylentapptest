import { IApplicationState } from '@store/rootTypes';
import { IWeatherState, WeatherData } from './weatherTypes';

const getState = (state: IApplicationState): IWeatherState => state.Weather;

const getData = (state: IApplicationState): WeatherData | null =>
  state.Weather.data;

const getLoading = (state: IApplicationState): boolean =>
  state.Weather.loading;

const getError = (state: IApplicationState): string | null =>
  state.Weather.error;

export const weatherSelectors = {
  getState,
  getData,
  getLoading,
  getError,
};
