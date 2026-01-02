import { ICallToAction } from '@store/modules/callToAction/callToActionTypes';

export enum EErrorScreenActionTypes {
  SHOW_ERROR_SCREEN = '@errorScreen/SHOW_ERROR_SCREEN',
  SET_ERROR_SCREEN = '@errorScreen/SET_ERROR_SCREEN',
}

export interface IErrorScreenData {
  title: string;
  description: string;
  errorCode?: string;
  primaryButton?: ICallToAction;
  secondaryButton?: ICallToAction;
  tertiaryButton?: ICallToAction;
}

export interface IErrorScreenState {
  data: IErrorScreenData | null;
}

export interface IErrorScreenPayload {
  data?: IErrorScreenData;
}

export type ErrorScreenAction = {
  type: EErrorScreenActionTypes;
  payload?: IErrorScreenPayload;
};

export type IErrorScreenReducer = (
  state: IErrorScreenState,
  action: ErrorScreenAction,
) => IErrorScreenState;
