import { IApplicationState } from '@store/rootTypes';
import { IModalState, IModalData } from './modalTypes';

const getState = (state: IApplicationState): IModalState => state.Generic.Modal;

const getVisible = (state: IApplicationState): boolean =>
  getState(state).visible;

const getData = (state: IApplicationState): IModalData | null =>
  getState(state).data;

export const modalSelectors = {
  getState,
  getVisible,
  getData,
};
