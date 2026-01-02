import { RootStackParamList } from '@navigation/config/paramLists';
import { AppRoute, AuthRoute, Route } from '@navigation/config/routes';
import { navigationRef } from '@navigation/navigationRef';
import { CommonActions, StackActions } from '@react-navigation/native';

type RootRouteName = keyof RootStackParamList;

// ==================== AUTH NAVIGATION ====================

export const authNav = {
  toWelcome: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.Auth as never,
      {
        screen: AuthRoute.Welcome,
      } as never,
    );
  },

  toLogin: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.Auth as never,
      {
        screen: AuthRoute.Login,
      } as never,
    );
  },

  toSignUp: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.Auth as never,
      {
        screen: AuthRoute.SignUp,
      } as never,
    );
  },

  toErrorScreen: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.Auth as never,
      {
        screen: AuthRoute.ErrorScreen,
      } as never,
    );
  },

  toLoadingScreen: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.Auth as never,
      {
        screen: AuthRoute.LoadingScreen,
      } as never,
    );
  },

  toForgotPassword: () => {
    console.warn('⚠️ Rota ForgotPassword não implementada ainda');
  },

  reset: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: Route.Auth as never,
            state: {
              routes: [{ name: AuthRoute.Welcome as never }],
            },
          },
        ],
      }),
    );
  },
};

// ==================== APP NAVIGATION ====================

export const appNav = {
  toHome: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.App as never,
      {
        screen: AppRoute.Home,
      } as never,
    );
  },

  toErrorScreen: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.App as never,
      {
        screen: AppRoute.ErrorScreen,
      } as never,
    );
  },

  toLoadingScreen: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(
      Route.App as never,
      {
        screen: AppRoute.LoadingScreen,
      } as never,
    );
  },

  /**
   * Navega para o gerenciador de casas (Places Manager)
   * @param screen - Tela específica dentro do PlacesManagerTabStack (opcional)
   * @param params - Parâmetros para passar para a tela (opcional)
   * @example
   * appNav.toPlacesManager() // Vai para a tab
   * appNav.toPlacesManager({ screen: 'HouseManager' }) // Vai para HouseManager
   * appNav.toPlacesManager({ screen: 'HouseManager', params: { homeId: '123' } })
   */
  toPlacesManager: (options?: {
    screen?: string;
    params?: Record<string, any>;
  }) => {
    console.log('🔍 toPlacesManager called with:', options);
    console.log('🔍 navigationRef.isReady():', navigationRef.isReady());

    if (!navigationRef.isReady()) {
      console.warn('⚠️ Navigation not ready!');
      return;
    }

    if (options?.screen) {
      console.log('🚀 Navigating to tab with screen:', options.screen);

      // Navega direto para a tab com nested screen
      navigationRef.navigate(
        AppRoute.PlacesManagerTabStack as never,
        {
          screen: options.screen,
          params: options.params,
        } as never,
      );
    } else {
      console.log('🚀 Navigating to tab only', options?.params);

      // Navega apenas para a tab
      navigationRef.navigate(
        AppRoute.PlacesManagerTabStack as never,
        options?.params as never,
      );
    }

    console.log('✅ Navigation dispatched');
  },
};

// ==================== GLOBAL NAVIGATION ====================

export const nav = {
  navigate: <RouteName extends RootRouteName>(
    screen: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (!navigationRef.isReady()) return;
    (navigationRef.navigate as any)(screen, params);
  },

  back: () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },

  canGoBack: () => {
    return navigationRef.isReady() && navigationRef.canGoBack();
  },

  replace: <RouteName extends RootRouteName>(
    screen: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(StackActions.replace(screen as string, params));
  },

  push: <RouteName extends RootRouteName>(
    screen: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(StackActions.push(screen as string, params));
  },

  pop: (count: number = 1) => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(StackActions.pop(count));
  },

  reset: (routeName: RootRouteName, params?: any) => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName as string, params }],
      }),
    );
  },

  switchToApp: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.App as never }],
      }),
    );
  },

  switchToAuth: () => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.Auth as never }],
      }),
    );
  },

  removeFromStack: () => {
    if (!navigationRef.isReady()) return;
    if (navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.pop());
    }
  },

  to: (screen: string, params?: any) => {
    if (!navigationRef.isReady()) return;
    navigationRef.navigate(screen as never, params as never);
  },

  resetToApp: (screen?: string, params?: any) => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: Route.App,
            state: screen
              ? {
                  routes: [{ name: screen, params }],
                }
              : undefined,
          },
        ],
      }),
    );
  },
};

// ==================== EXPORTS ====================

export const navigation = {
  auth: authNav,
  app: appNav,
  ...nav,
};

export { authNav as auth, appNav as app };
