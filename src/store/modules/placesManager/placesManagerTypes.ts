export enum EPlacesManagerActionTypes {
  // Request actions (disparam saga)
  ADD_HOME_REQUEST = '@placesManager/ADD_HOME_REQUEST',
  UPDATE_HOME_REQUEST = '@placesManager/UPDATE_HOME_REQUEST',
  DELETE_HOME_REQUEST = '@placesManager/DELETE_HOME_REQUEST',

  ADD_ROOM_REQUEST = '@placesManager/ADD_ROOM_REQUEST',
  UPDATE_ROOM_REQUEST = '@placesManager/UPDATE_ROOM_REQUEST',
  DELETE_ROOM_REQUEST = '@placesManager/DELETE_ROOM_REQUEST',

  ADD_DEVICE_REQUEST = '@placesManager/ADD_DEVICE_REQUEST',
  UPDATE_DEVICE_REQUEST = '@placesManager/UPDATE_DEVICE_REQUEST',
  DELETE_DEVICE_REQUEST = '@placesManager/DELETE_DEVICE_REQUEST',

  // Set actions (saga seta no reducer)
  SET_DATA = '@placesManager/SET_DATA',
  SET_LOADING = '@placesManager/SET_LOADING',
  SET_ERROR = '@placesManager/SET_ERROR',

  // Select actions
  SELECT_HOME = '@placesManager/SELECT_HOME',

  //Navegação guiada
  NAVIGATE_TO_HOUSE_MANAGEMENT = '@placesManager/NAVIGATE_TO_HOUSE_MANAGEMENT',
}

export enum EDeviceType {
  POOL = 'pool',
  LIGHT = 'light',
  SENSOR = 'sensor',
  PUMP = 'pump',
  HEATER = 'heater',
  OTHER = 'other',
}

export interface IDevice {
  id: string;
  name: string;
  type: EDeviceType;
  roomId: string;
  status: 'online' | 'offline';
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface IRoom {
  roomId: string;
  name: string;
  homeId: string;
  icon?: string;
  devices: IDevice[];
  createdAt: string;
}

export interface IHome {
  homeId: string;
  name: string;
  rooms: IRoom[];
  createdAt: string;
}

export interface IPlacesManagerData {
  homes: IHome[];
  selectedHome?: IHome;
}

export interface IPlacesManagerState {
  data: IPlacesManagerData;
  isLoading: boolean;
  isError: boolean;
}

export interface IPlacesManagerPayload {
  homeName?: string;
  home?: IHome;
  homeId?: string;
  room?: IRoom;
  roomId?: string;
  device?: IDevice;
  deviceId?: string;
  data?: IPlacesManagerData;
  isLoading?: boolean;
  isError?: boolean;
}

export type PlacesManagerAction = {
  type: EPlacesManagerActionTypes;
  payload?: IPlacesManagerPayload;
};

export type IPlacesManagerReducer = (
  state: IPlacesManagerState,
  action: PlacesManagerAction,
) => IPlacesManagerState;
