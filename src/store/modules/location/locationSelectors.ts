/**
 * Location Selectors
 */

import { RootState } from '@store/rootReducer';

// ========================================
// SELECTORS
// ========================================

/**
 * Retorna state completo de location
 */
export const selectLocationState = (state: RootState) => state.location;

/**
 * Retorna coordenadas
 */
export const selectCoordinates = (state: RootState) =>
  state.location?.coordinates;

/**
 * Retorna latitude
 */
export const selectLatitude = (state: RootState) =>
  state.location.coordinates?.latitude ?? null;

/**
 * Retorna longitude
 */
export const selectLongitude = (state: RootState) =>
  state.location.coordinates?.longitude ?? null;

/**
 * Retorna cidade
 */
export const selectCity = (state: RootState) => state.location.city;

/**
 * Retorna estado
 */
export const selectState = (state: RootState) => state.location.state;

/**
 * Retorna cidade + estado formatado
 * Ex: "São Paulo, SP"
 */
export const selectCityState = (state: RootState) => {
  const { city, state: stateCode } = state.location;
  if (city && stateCode) {
    return `${city}, ${stateCode}`;
  }
  if (city) {
    return city;
  }
  return null;
};

/**
 * Retorna loading
 */
export const selectLocationLoading = (state: RootState) =>
  state.location.loading;

/**
 * Retorna error
 */
export const selectLocationError = (state: RootState) => state.location.error;

/**
 * Retorna última atualização
 */
export const selectLastUpdate = (state: RootState) => state.location.lastUpdate;

/**
 * Retorna status de permissão
 */
export const selectPermissionStatus = (state: RootState) =>
  state.location.permissionStatus;

/**
 * Retorna se tem localização disponível
 */
export const selectHasLocation = (state: RootState) =>
  state.location.coordinates !== null;

/**
 * Retorna se permissão foi concedida
 */
export const selectIsPermissionGranted = (state: RootState) =>
  state.location.permissionStatus === 'granted';

/**
 * Retorna se permissão foi negada
 */
export const selectIsPermissionDenied = (state: RootState) =>
  state.location.permissionStatus === 'denied';
