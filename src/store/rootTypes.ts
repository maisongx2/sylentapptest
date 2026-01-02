import { IAuthState } from './modules/auth/authTypes';
import { IGenericState } from './modules/generic/genericTypes';
import { IPlacesManagerState } from './modules/placesManager/placesManagerTypes';
import { IRegisterState } from './modules/register/registerTypes';
import { IWeatherState } from './modules/weather/weatherTypes';

export interface IApplicationState {
  Auth: IAuthState;
  Weather: IWeatherState;
  Generic: IGenericState;
  Register: IRegisterState;
  PlacesManager: IPlacesManagerState;
}
