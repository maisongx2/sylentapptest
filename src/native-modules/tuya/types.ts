export interface SendVerifyCodeResponse {
  success: true;
  message: string;
}

export interface RegisterResponse {
  success: true;
  uid: string;
  email: string;
  username: string;
}

export interface LoginResponse {
  success: true;
  uid: string;
  email: string;
  username: string;
  phoneCode?: string;
  mobile?: string;
}

export interface LogoutResponse {
  success: true;
}

export interface CreateHomeResponse {
  success: true;
  homeId: number;
  name: string;
  geoName: string;
}

export interface RoomData {
  roomId: number;
  name: string;
}

export interface HomeData {
  homeId: number;
  name: string;
  geoName: string;
  rooms: RoomData[];
}

export type GetHomeListResponse = HomeData[];
