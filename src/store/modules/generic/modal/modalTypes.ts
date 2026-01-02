import { Icon } from '@assets/icons';
import { ICallToAction } from '@store/modules/callToAction/callToActionTypes';

export enum EModalActionTypes {
  SHOW_MODAL = '@modal/SHOW_MODAL',
  CLOSE_MODAL = '@modal/CLOSE_MODAL',
}

export enum EModalType {
  FULLSCREEN = 'fullscreen',
  FOOTER = 'footer',
}

export interface IModalData {
  icon?: Icon;
  title: string;
  subtitle?: string;
  type: EModalType;
  primaryButton?: ICallToAction;
  secondaryButton?: ICallToAction;
  closeButton?: boolean;
}

export interface IModalState {
  visible: boolean;
  data: IModalData | null;
}

export interface IModalPayload {
  data?: IModalData;
}

export type ModalAction = {
  type: EModalActionTypes;
  payload?: IModalPayload;
};

export type IModalReducer = (
  state: IModalState,
  action: ModalAction,
) => IModalState;
