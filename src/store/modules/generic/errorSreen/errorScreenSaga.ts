import { put, takeLatest, select } from 'redux-saga/effects';
import { EErrorScreenActionTypes, ErrorScreenAction } from './errorScreenTypes';
import { authSelectors } from '@store/modules/auth/authSelectors';
import { authNav, appNav } from '@navigation/helpers/navigation-helpers';
import { errorScreenActions } from './errorScreenActions';

function* showErrorScreenWorker(action: ErrorScreenAction) {
  if (!action.payload?.data) return;

  const isAuthenticated: boolean = yield select(
    authSelectors.getIsAuthenticated,
  );

  yield put(errorScreenActions.setErrorScreen(action.payload?.data));

  if (isAuthenticated) {
    yield put(appNav.toErrorScreen);
  } else {
    yield put(authNav.toErrorScreen);
  }
}

export default [
  takeLatest(EErrorScreenActionTypes.SHOW_ERROR_SCREEN, showErrorScreenWorker),
];
