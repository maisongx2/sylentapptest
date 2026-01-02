/**
 * Location Saga
 * Gerencia busca de coordenadas e identificação de cidade
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { locationActions } from './locationActions';
import { ELocationActionTypes } from './locationTypes';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// ========================================
// BRAZILIAN CITIES DATABASE
// ========================================

const BRAZILIAN_CITIES = [
  { name: 'São Paulo', state: 'SP', lat: -23.5505, lon: -46.6333 },
  { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lon: -43.1729 },
  { name: 'Brasília', state: 'DF', lat: -15.7939, lon: -47.8828 },
  { name: 'Salvador', state: 'BA', lat: -12.9714, lon: -38.5014 },
  { name: 'Fortaleza', state: 'CE', lat: -3.7172, lon: -38.5433 },
  { name: 'Belo Horizonte', state: 'MG', lat: -19.9167, lon: -43.9345 },
  { name: 'Manaus', state: 'AM', lat: -3.1190, lon: -60.0217 },
  { name: 'Curitiba', state: 'PR', lat: -25.4284, lon: -49.2733 },
  { name: 'Recife', state: 'PE', lat: -8.0476, lon: -34.8770 },
  { name: 'Porto Alegre', state: 'RS', lat: -30.0346, lon: -51.2177 },
  { name: 'Belém', state: 'PA', lat: -1.4558, lon: -48.4902 },
  { name: 'Goiânia', state: 'GO', lat: -16.6869, lon: -49.2648 },
  { name: 'Guarulhos', state: 'SP', lat: -23.4538, lon: -46.5333 },
  { name: 'Campinas', state: 'SP', lat: -22.9099, lon: -47.0626 },
  { name: 'São Luís', state: 'MA', lat: -2.5387, lon: -44.2825 },
  { name: 'São Gonçalo', state: 'RJ', lat: -22.8268, lon: -43.0539 },
  { name: 'Maceió', state: 'AL', lat: -9.6658, lon: -35.7353 },
  { name: 'Duque de Caxias', state: 'RJ', lat: -22.7858, lon: -43.3054 },
  { name: 'Natal', state: 'RN', lat: -5.7945, lon: -35.2110 },
  { name: 'Teresina', state: 'PI', lat: -5.0919, lon: -42.8034 },
  { name: 'Campo Grande', state: 'MS', lat: -20.4697, lon: -54.6201 },
  { name: 'Nova Iguaçu', state: 'RJ', lat: -22.7592, lon: -43.4511 },
  { name: 'São Bernardo do Campo', state: 'SP', lat: -23.6914, lon: -46.5646 },
  { name: 'João Pessoa', state: 'PB', lat: -7.1195, lon: -34.8450 },
  { name: 'Santo André', state: 'SP', lat: -23.6636, lon: -46.5341 },
  { name: 'Osasco', state: 'SP', lat: -23.5329, lon: -46.7919 },
  { name: 'Jaboatão dos Guararapes', state: 'PE', lat: -8.1130, lon: -35.0148 },
  { name: 'São José dos Campos', state: 'SP', lat: -23.1791, lon: -45.8872 },
  { name: 'Ribeirão Preto', state: 'SP', lat: -21.1704, lon: -47.8103 },
  { name: 'Uberlândia', state: 'MG', lat: -18.9186, lon: -48.2772 },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calcula distância entre dois pontos (fórmula de Haversine)
 * @returns Distância em km
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Encontra cidade mais próxima das coordenadas
 */
export function getNearestCity(lat: number, lon: number) {
  console.log(`📍 [LOCATION] Buscando cidade próxima a: ${lat}, ${lon}`);

  let nearestCity = BRAZILIAN_CITIES[0];
  let minDistance = calculateDistance(
    lat,
    lon,
    nearestCity.lat,
    nearestCity.lon,
  );

  BRAZILIAN_CITIES.forEach(city => {
    const distance = calculateDistance(lat, lon, city.lat, city.lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  });

  console.log(
    `✅ [LOCATION] Cidade mais próxima: ${nearestCity.name}, ${nearestCity.state} (${minDistance.toFixed(1)}km)`,
  );

  return {
    city: nearestCity.name,
    state: nearestCity.state,
    distance: minDistance,
  };
}

/**
 * Solicita permissão de localização no Android
 */
async function requestLocationPermissionAndroid() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de localização',
        message: 'Precisamos da sua localização para personalizar sua experiência.',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancelar',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.warn('⚠️ [LOCATION] Erro ao solicitar permissão:', error);
    return false;
  }
}

/**
 * Obtém localização atual do dispositivo
 */
async function getCurrentLocation(): Promise<{
  coords: { latitude: number; longitude: number };
}> {
  // Android: solicita permissão
  if (Platform.OS === 'android') {
    const ok = await requestLocationPermissionAndroid();
    if (!ok) {
      throw new Error('Permissão de localização negada');
    }
  }

  // iOS: solicita autorização
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'denied' || auth === 'restricted') {
      throw new Error('Permissão de localização negada');
    }
  }

  // Busca coordenadas
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('✅ [LOCATION] Coordenadas obtidas:', {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        resolve(position);
      },
      error => {
        console.error('❌ [LOCATION] Erro ao obter GPS:', error);
        reject(error);
      },
      {
        enableHighAccuracy: false, // false = mais rápido (WiFi/Rede)
        timeout: 15000, // 15 segundos
        maximumAge: 300000, // Cache de 5 minutos
      },
    );
  });
}

// ========================================
// SAGA WORKERS
// ========================================

/**
 * Worker: Busca localização do usuário
 */
function* fetchLocationWorker() {
  try {
    console.log('📍 [LOCATION SAGA] Iniciando busca de localização...');

    // 1. Busca coordenadas do GPS
    const location: { coords: { latitude: number; longitude: number } } =
      yield call(getCurrentLocation);

    const { latitude, longitude } = location.coords;

    // 2. Identifica cidade mais próxima
    const cityInfo: { city: string; state: string; distance: number } =
      yield call(getNearestCity, latitude, longitude);

    console.log('✅ [LOCATION SAGA] Localização identificada:', {
      coords: { latitude, longitude },
      city: cityInfo.city,
      state: cityInfo.state,
      distance: `${cityInfo.distance.toFixed(1)}km`,
    });

    // 3. Dispatch success
    yield put(
      locationActions.fetchLocationSuccess({
        coordinates: { latitude, longitude },
        city: cityInfo.city,
        state: cityInfo.state,
        lastUpdate: new Date().toISOString(),
      }),
    );
  } catch (error: any) {
    console.error('❌ [LOCATION SAGA] Erro ao buscar localização:', error);

    const message =
      error?.message || 'Não foi possível obter sua localização';

    // Atualiza status de permissão se for erro de permissão
    if (
      message.includes('negada') ||
      message.includes('denied') ||
      message.includes('restricted')
    ) {
      yield put(locationActions.updatePermissionStatus('denied'));
    }

    // Dispatch failure
    yield put(locationActions.fetchLocationFailure(message));
  }
}

// ========================================
// SAGA WATCHERS
// ========================================

export default [
  takeLatest(ELocationActionTypes.FETCH_LOCATION_REQUEST, fetchLocationWorker),
];
