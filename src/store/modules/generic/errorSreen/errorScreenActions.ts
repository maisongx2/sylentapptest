import {
  EErrorScreenActionTypes,
  ErrorScreenAction,
  IErrorScreenData,
} from './errorScreenTypes';

const showErrorScreen = (data: IErrorScreenData): ErrorScreenAction => ({
  type: EErrorScreenActionTypes.SHOW_ERROR_SCREEN,
  payload: { data },
});

const setErrorScreen = (data: IErrorScreenData): ErrorScreenAction => ({
  type: EErrorScreenActionTypes.SET_ERROR_SCREEN,
  payload: { data },
});

export const errorScreenActions = {
  showErrorScreen,
  setErrorScreen,
};
