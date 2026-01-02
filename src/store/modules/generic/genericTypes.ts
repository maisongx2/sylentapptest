import { IErrorScreenState } from './errorSreen/errorScreenTypes';
import { IModalState } from './Modal/modalTypes';

export interface IGenericState {
  ErrorScreen: IErrorScreenState;
  Modal: IModalState;
}
