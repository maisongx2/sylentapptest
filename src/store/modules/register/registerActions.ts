import {
  ERegisterActionTypes,
  RegisterAction,
  IRegisterData,
} from './registerTypes';

const registerRequest = (registerData: IRegisterData): RegisterAction => ({
  type: ERegisterActionTypes.REGISTER_REQUEST,
  payload: { registerData },
});

export const registerActions = {
  registerRequest,
};
