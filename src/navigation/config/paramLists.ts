import { AppRoute, AuthRoute, Route } from './routes';

export type AuthStackParamList = {
  [AuthRoute.Welcome]: undefined;
  [AuthRoute.Login]: undefined;
  [AuthRoute.SignUp]: undefined;
  [AuthRoute.ErrorScreen]: undefined;
  [AuthRoute.LoadingScreen]: undefined;
};

export type AppStackParamList = {
  [AppRoute.Home]: undefined;
  [AppRoute.ErrorScreen]: undefined;
  [AppRoute.LoadingScreen]: undefined;
  [AppRoute.HouseManagement]: { homeId?: string };
};

export type PlacesManagerStackParamList = {
  [AppRoute.HouseList]: undefined;
  [AppRoute.HouseDetails]: { homeId?: string };
  [AppRoute.AddRoom]: { homeId?: string };
};

export type RootStackParamList = {
  [Route.Auth]: undefined; // ou NavigatorScreenParams<AuthStackParamList>
  [Route.App]: undefined; // ou NavigatorScreenParams<AppStackParamList>
};
