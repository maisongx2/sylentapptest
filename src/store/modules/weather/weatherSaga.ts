/**
 * Weather Saga
 * Integrado com Location Store
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { weatherActions } from './weatherActions';
import {
  WeatherAction,
  EWeatherActionTypes,
  WeatherData,
} from './weatherTypes';
import { weatherService } from './weatherService';

// ✨ Importa selectors da Location Store
import {
  selectCoordinates,
  selectCity,
  selectState,
} from '@store/modules/location/locationSelectors';

/**
 * Worker: Busca dados do clima
 *
 * ✨ NOVA LÓGICA:
 * 1. Verifica se action tem coordenadas/cidade (override manual)
 * 2. Se não, busca coordenadas da Location Store
 * 3. Se Location Store vazia, usa fallback São Paulo
 */
function* fetchWeatherWorker(action: WeatherAction) {
  try {
    console.log(
      '🌤️ [WEATHER SAGA] Iniciando busca de clima...',
      action.payload,
    );

    const { latitude, longitude, city } = action.payload || {};

    let data: WeatherData;
    let sourceCity = '';
    let sourceState = '';

    // ========================================
    // PRIORIDADE 1: Coordenadas explícitas (override manual)
    // ========================================
    if (latitude && longitude) {
      console.log('📍 [WEATHER SAGA] Usando coordenadas fornecidas:', {
        latitude,
        longitude,
      });

      data = yield call(weatherService.getWeatherByCoords, latitude, longitude);

      // Tenta buscar cidade da Location Store (se disponível)
      const storeCity: string | null = yield select(selectCity);
      const storeState: string | null = yield select(selectState);

      sourceCity = storeCity || data.city || '';
      sourceState = storeState || data.state || '';
    }
    // ========================================
    // PRIORIDADE 2: Cidade explícita (override manual)
    // ========================================
    else if (city) {
      console.log('🏙️ [WEATHER SAGA] Buscando por cidade:', city);

      // Aqui você pode implementar busca por cidade se tiver o service
      // Por enquanto, vamos usar fallback
      console.warn(
        '⚠️ [WEATHER SAGA] Busca por cidade não implementada, usando fallback',
      );

      data = yield call(weatherService.getWeatherByCoords, -23.5505, -46.6333);
      sourceCity = 'São Paulo';
      sourceState = 'SP';
    }
    // ========================================
    // PRIORIDADE 3: ✨ Busca coordenadas da Location Store
    // ========================================
    else {
      console.log(
        '📍 [WEATHER SAGA] Buscando coordenadas da Location Store...',
      );

      // Busca coordenadas salvas na Location Store
      const storeCoordinates: { latitude: number; longitude: number } | null =
        yield select(selectCoordinates);

      if (storeCoordinates) {
        console.log(
          '✅ [WEATHER SAGA] Usando coordenadas da Location Store:',
          storeCoordinates,
        );

        const { latitude: lat, longitude: lon } = storeCoordinates;

        data = yield call(weatherService.getWeatherByCoords, lat, lon);

        // ✨ Busca cidade/estado da Location Store
        const storeCity: string | null = yield select(selectCity);
        const storeState: string | null = yield select(selectState);

        sourceCity = storeCity || data.city || '';
        sourceState = storeState || data.state || '';

        console.log('📍 [WEATHER SAGA] Cidade da Location Store:', {
          city: sourceCity,
          state: sourceState,
        });
      } else {
        // ========================================
        // FALLBACK: Location Store vazia - Usa São Paulo
        // ========================================
        console.warn(
          '⚠️ [WEATHER SAGA] Location Store vazia, usando fallback São Paulo',
        );

        data = yield call(
          weatherService.getWeatherByCoords,
          -23.5505,
          -46.6333,
        );
        sourceCity = 'São Paulo';
        sourceState = 'SP';
      }
    }

    // ========================================
    // ✨ Sobrescreve city/state com dados da Location Store
    // ========================================
    data = {
      ...data,
      city: sourceCity,
      state: sourceState,
    };

    console.log('✅ [WEATHER SAGA] Clima obtido:', {
      city: data.city,
      state: data.state,
      temp: data.temperature,
      condition: data.condition,
    });

    // Dispatch success
    yield put(weatherActions.fetchWeatherSuccess(data));
  } catch (e: any) {
    console.error('❌ [WEATHER SAGA] Erro ao buscar clima:', e);

    const message =
      e?.response?.data?.message ||
      e?.message ||
      'Não foi possível buscar dados do clima';

    // Dispatch failure
    yield put(weatherActions.fetchWeatherFailure(message));
  }
}

/**
 * Watcher: Escuta actions de busca do clima
 */
export default [
  takeLatest(EWeatherActionTypes.FETCH_WEATHER_REQUEST, fetchWeatherWorker),
];
