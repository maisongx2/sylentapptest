import { combineReducers } from '@reduxjs/toolkit';
import errorScreenReducer from './errorSreen/errorScreenReducer';
import modalReducer from './modal/modalReducer';

export const genericReducer = combineReducers({
  ErrorScreen: errorScreenReducer,
  Modal: modalReducer,
});

export default genericReducer;
export type ReducerState = ReturnType<typeof genericReducer>;
