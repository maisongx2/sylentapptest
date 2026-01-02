import { call, takeLatest } from 'redux-saga/effects';
import {
  ECallToActionActionTypes,
  CallToActionAction,
} from './callToActionTypes';
import { handleCallToAction } from './callToActionUtils';

function* navigateCallToActionWorker(action: CallToActionAction) {
  const { cta } = action.payload;
  yield call(handleCallToAction, cta);
}

export default [
  takeLatest(ECallToActionActionTypes.NAVIGATE_CTA, navigateCallToActionWorker),
];
