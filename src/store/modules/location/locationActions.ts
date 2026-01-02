/**
 * Location Actions
 */

import {
  ELocationActionTypes,
  LocationAction,
  FetchLocationSuccessPayload,
  FetchLocationFailurePayload,
  UpdatePermissionStatusPayload,
} from './locationTypes';

// ========================================
// ACTION CREATORS
// ========================================

/**
 * Solicita busca de localização do dispositivo
 */
const fetchLocationRequest = (): LocationAction => ({
  type: ELocationActionTypes.FETCH_LOCATION_REQUEST,
});

/**
 * Localização obtida com sucesso
 */
const fetchLocationSuccess = (
  payload: FetchLocationSuccessPayload,
): LocationAction => ({
  type: ELocationActionTypes.FETCH_LOCATION_SUCCESS,
  payload,
});

/**
 * Erro ao buscar localização
 */
const fetchLocationFailure = (
  payload: FetchLocationFailurePayload,
): LocationAction => ({
  type: ELocationActionTypes.FETCH_LOCATION_FAILURE,
  payload,
});

/**
 * Atualiza status de permissão
 */
const updatePermissionStatus = (
  payload: UpdatePermissionStatusPayload,
): LocationAction => ({
  type: ELocationActionTypes.UPDATE_PERMISSION_STATUS,
  payload,
});

/**
 * Limpa dados de localização
 */
const clearLocation = (): LocationAction => ({
  type: ELocationActionTypes.CLEAR_LOCATION,
});

// ========================================
// EXPORTS
// ========================================

export const locationActions = {
  fetchLocationRequest,
  fetchLocationSuccess,
  fetchLocationFailure,
  updatePermissionStatus,
  clearLocation,
};
