import { useCallback } from 'react';
import { appNav, authNav, nav } from './navigation-helpers';

/**
 * Hook simplificado para navegação no AuthStack
 * Use este hook em componentes de autenticação
 */
export const useAuthNav = () => {
  return {
    toWelcome: useCallback(() => authNav.toWelcome(), []),
    toLogin: useCallback(() => authNav.toLogin(), []),
    toSignUp: useCallback(() => authNav.toSignUp(), []),
    toForgotPassword: useCallback(() => authNav.toForgotPassword(), []),
    reset: useCallback(() => authNav.reset(), []),
    back: useCallback(() => nav.back(), []),
  };
};

/**
 * Hook simplificado para navegação no AppStack
 * Use este hook em componentes autenticados
 */
export const useAppNav = () => {
  return {
    toHome: useCallback(() => appNav.toHome(), []),
    back: useCallback(() => nav.back(), []),
    // Adicione outros métodos conforme necessário
  };
};

/**
 * Hook para navegação global (trocar entre Auth/App)
 * Use para ações como login/logout
 */
export const useNav = () => {
  return {
    back: useCallback(() => nav.back(), []),
    canGoBack: useCallback(() => nav.canGoBack(), []),
    switchToApp: useCallback(() => nav.switchToApp(), []),
    switchToAuth: useCallback(() => nav.switchToAuth(), []),
  };
};
