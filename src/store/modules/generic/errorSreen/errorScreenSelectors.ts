import { IApplicationState } from '@store/rootTypes';
import { IErrorScreenState, IErrorScreenData } from './errorScreenTypes';

const getState = (state: IApplicationState): IErrorScreenState =>
  state.Generic.ErrorScreen;

const getData = (state: IApplicationState): IErrorScreenData | null =>
  getState(state).data;

export const errorScreenSelectors = {
  getState,
  getData,
};
