/**
 * Location Types
 * Gerencia coordenadas e informações de localização do usuário
 */

// ========================================
// STATE
// ========================================

export type LocationState = {
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  city: string | null;
  state: string | null;
  loading: boolean;
  error: string | null;
  lastUpdate: string | null;
  permissionStatus: 'granted' | 'denied' | 'not_requested' | 'restricted';
};

// ========================================
// ACTION TYPES
// ========================================

export enum ELocationActionTypes {
  // Fetch Location
  FETCH_LOCATION_REQUEST = '@location/FETCH_LOCATION_REQUEST',
  FETCH_LOCATION_SUCCESS = '@location/FETCH_LOCATION_SUCCESS',
  FETCH_LOCATION_FAILURE = '@location/FETCH_LOCATION_FAILURE',

  // Update Permission
  UPDATE_PERMISSION_STATUS = '@location/UPDATE_PERMISSION_STATUS',

  // Clear Location
  CLEAR_LOCATION = '@location/CLEAR_LOCATION',
}

// ========================================
// ACTION PAYLOADS
// ========================================

export type LocationData = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  city: string;
  state: string;
  lastUpdate: string;
};

export type FetchLocationRequestPayload = void;

export type FetchLocationSuccessPayload = LocationData;

export type FetchLocationFailurePayload = string;

export type UpdatePermissionStatusPayload = 'granted' | 'denied' | 'not_requested' | 'restricted';

// ========================================
// ACTIONS
// ========================================

export type LocationAction =
  | { type: ELocationActionTypes.FETCH_LOCATION_REQUEST }
  | {
      type: ELocationActionTypes.FETCH_LOCATION_SUCCESS;
      payload: FetchLocationSuccessPayload;
    }
  | {
      type: ELocationActionTypes.FETCH_LOCATION_FAILURE;
      payload: FetchLocationFailurePayload;
    }
  | {
      type: ELocationActionTypes.UPDATE_PERMISSION_STATUS;
      payload: UpdatePermissionStatusPayload;
    }
  | { type: ELocationActionTypes.CLEAR_LOCATION };
