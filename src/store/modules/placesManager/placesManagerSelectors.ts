import { IApplicationState } from '@store/rootTypes';
import {
  IPlacesManagerState,
  IPlacesManagerData,
  IHome,
  IRoom,
  IDevice,
} from './placesManagerTypes';

const getState = (state: IApplicationState): IPlacesManagerState =>
  state.PlacesManager;

const getData = (state: IApplicationState): IPlacesManagerData =>
  getState(state).data;

const getIsLoading = (state: IApplicationState): boolean =>
  getState(state).isLoading;

const getIsError = (state: IApplicationState): boolean =>
  getState(state).isError;

// Homes
const getAllHomes = (state: IApplicationState): IHome[] => getData(state).homes;

const getHomeById =
  (homeId: string) =>
  (state: IApplicationState): IHome | undefined =>
    getData(state).homes.find(home => home.homeId === homeId);

// Selected Home
const getSelectedHome = (state: IApplicationState): IHome | undefined =>
  getData(state).selectedHome;

const getSelectedHomeRooms = (state: IApplicationState): IRoom[] => {
  const selectedHome = getSelectedHome(state);
  return selectedHome?.rooms ?? [];
};

const getSelectedHomeDevices = (state: IApplicationState): IDevice[] => {
  const selectedHome = getSelectedHome(state);
  if (!selectedHome) return [];

  return selectedHome.rooms.flatMap(room => room.devices);
};

const getSelectedHomeStats = (state: IApplicationState) => {
  const selectedHome = getSelectedHome(state);
  if (!selectedHome) return null;

  const devices = getSelectedHomeDevices(state);

  return {
    totalRooms: selectedHome.rooms.length,
    totalDevices: devices.length,
    onlineDevices: devices.filter(d => d.status === 'online').length,
    offlineDevices: devices.filter(d => d.status === 'offline').length,
  };
};

export const getRoomById =
  (homeId: string, roomId: string) =>
  (state: IApplicationState): IRoom | undefined => {
    const home = getHomeById(homeId)(state);
    return home?.rooms.find(room => room.roomId === roomId);
  };

export const getRoomsByHomeId =
  (homeId: string) =>
  (state: IApplicationState): IRoom[] => {
    const home = getHomeById(homeId)(state);
    return home?.rooms ?? [];
  };

export const getDeviceById =
  (homeId: string, roomId: string, deviceId: string) =>
  (state: IApplicationState): IDevice | undefined => {
    const room = getRoomById(homeId, roomId)(state);
    return room?.devices.find(device => device.id === deviceId);
  };

export const getDevicesByRoomId =
  (homeId: string, roomId: string) =>
  (state: IApplicationState): IDevice[] => {
    const room = getRoomById(homeId, roomId)(state);
    return room?.devices ?? [];
  };

export const getDevicesByHomeId =
  (homeId: string) =>
  (state: IApplicationState): IDevice[] => {
    const home = getHomeById(homeId)(state);
    if (!home) return [];

    return home.rooms.flatMap(room => room.devices);
  };

export const placesManagerSelectors = {
  getState,
  getData,
  getIsLoading,
  getIsError,
  // Homes
  getAllHomes,
  getHomeById,
  // Selected Home
  getSelectedHome,
  getSelectedHomeRooms,
  getSelectedHomeDevices,
  getSelectedHomeStats,
  // Rooms
  getRoomById,
  getRoomsByHomeId,
  // Devices
  getDeviceById,
  getDevicesByRoomId,
  getDevicesByHomeId,
};
