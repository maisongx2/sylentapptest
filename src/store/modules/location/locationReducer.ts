/**
 * Location Reducer
 */

import { Reducer } from 'redux';
import { LocationState, LocationAction, ELocationActionTypes } from './locationTypes';

// ========================================
// INITIAL STATE
// ========================================

const INITIAL_STATE: LocationState = {
  coordinates: null,
  city: null,
  state: null,
  loading: false,
  error: null,
  lastUpdate: null,
  permissionStatus: 'not_requested',
};

// ========================================
// REDUCER
// ========================================

const locationReducer: Reducer<LocationState, LocationAction> = (
  state = INITIAL_STATE,
  action,
): LocationState => {
  switch (action.type) {
    // ========================================
    // FETCH LOCATION
    // ========================================

    case ELocationActionTypes.FETCH_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ELocationActionTypes.FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        coordinates: action.payload.coordinates,
        city: action.payload.city,
        state: action.payload.state,
        lastUpdate: action.payload.lastUpdate,
        permissionStatus: 'granted', // Se teve sucesso, permissão foi concedida
      };

    case ELocationActionTypes.FETCH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ========================================
    // UPDATE PERMISSION
    // ========================================

    case ELocationActionTypes.UPDATE_PERMISSION_STATUS:
      return {
        ...state,
        permissionStatus: action.payload,
      };

    // ========================================
    // CLEAR LOCATION
    // ========================================

    case ELocationActionTypes.CLEAR_LOCATION:
      return INITIAL_STATE;

    // ========================================
    // DEFAULT
    // ========================================

    default:
      return state;
  }
};

export default locationReducer;
