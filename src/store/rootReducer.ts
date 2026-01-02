import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth/authReducer';
import weatherReducer from './modules/weather/weatherReducer';
import genericReducer from './modules/generic/genericReducer';
import registerReducer from './modules/register/registerReducer';
import placesManagerReducer from './modules/placesManager/placesManagerReducer';

export const rootReducer = combineReducers({
  Auth: authReducer,
  Weather: weatherReducer,
  Generic: genericReducer,
  Register: registerReducer,
  PlacesManager: placesManagerReducer,
});

export default rootReducer;
export type ReducerState = ReturnType<typeof rootReducer>;
