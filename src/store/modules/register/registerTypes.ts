export enum ERegisterActionTypes {
  REGISTER_REQUEST = '@register/REGISTER_REQUEST',
}

export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileType: string;
  whatsapp: string;
  verificationCode: string;
}

export interface IRegisterState {
  loading: boolean;
  error: string | null;
}

export interface IRegisterPayload {
  registerData?: IRegisterData;
  error?: string | null;
  loading?: boolean;
}

export type RegisterAction = {
  type: ERegisterActionTypes;
  payload?: IRegisterPayload;
};

export type IRegisterReducer = (
  state: IRegisterState,
  action: RegisterAction,
) => IRegisterState;
