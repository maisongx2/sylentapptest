import {
  EPlacesManagerActionTypes,
  PlacesManagerAction,
  IHome,
  IRoom,
  IDevice,
  IPlacesManagerData,
} from './placesManagerTypes';

// Request actions (disparam saga)
const addHomeRequest = (homeName: string): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.ADD_HOME_REQUEST,
  payload: { homeName },
});

const updateHomeRequest = (home: IHome): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.UPDATE_HOME_REQUEST,
  payload: { home },
});

const deleteHomeRequest = (homeId: string): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.DELETE_HOME_REQUEST,
  payload: { homeId },
});

const addRoomRequest = (room: IRoom, homeId: string): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.ADD_ROOM_REQUEST,
  payload: { room, homeId },
});

const updateRoomRequest = (
  room: IRoom,
  homeId: string,
): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.UPDATE_ROOM_REQUEST,
  payload: { room, homeId },
});

const deleteRoomRequest = (
  roomId: string,
  homeId: string,
): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.DELETE_ROOM_REQUEST,
  payload: { roomId, homeId },
});

const addDeviceRequest = (
  device: IDevice,
  roomId: string,
  homeId: string,
): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.ADD_DEVICE_REQUEST,
  payload: { device, roomId, homeId },
});

const updateDeviceRequest = (
  device: IDevice,
  roomId: string,
  homeId: string,
): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.UPDATE_DEVICE_REQUEST,
  payload: { device, roomId, homeId },
});

const deleteDeviceRequest = (
  deviceId: string,
  roomId: string,
  homeId: string,
): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.DELETE_DEVICE_REQUEST,
  payload: { deviceId, roomId, homeId },
});

// Set actions (saga usa internamente)
const setData = (data: IPlacesManagerData): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.SET_DATA,
  payload: { data },
});

const setLoading = (isLoading: boolean): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.SET_LOADING,
  payload: { isLoading },
});

const setError = (isError: boolean): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.SET_ERROR,
  payload: { isError },
});

// Select actions
const selectHome = (home: IHome | undefined): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.SELECT_HOME,
  payload: { home },
});

const navigateToHouseManagement = (): PlacesManagerAction => ({
  type: EPlacesManagerActionTypes.NAVIGATE_TO_HOUSE_MANAGEMENT,
});

export const placesManagerActions = {
  // Request (usa no componente)
  addHomeRequest,
  updateHomeRequest,
  deleteHomeRequest,
  addRoomRequest,
  updateRoomRequest,
  deleteRoomRequest,
  addDeviceRequest,
  updateDeviceRequest,
  deleteDeviceRequest,
  // Set (saga usa internamente)
  setData,
  setLoading,
  setError,
  // Select
  selectHome,
  //Navegação guiada
  navigateToHouseManagement,
};
