import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  AuthStackParamList, 
  AppStackParamList,
  RootStackParamList 
} from '../config/paramLists';

/**
 * Hook de navegação para o RootStack
 */
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Hook de navegação para o AuthStack
 */
export type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;

/**
 * Hook de navegação para o AppStack
 */
export type AppNavigationProp = StackNavigationProp<AppStackParamList>;

/**
 * Hook para navegação dentro do AuthStack
 * Use este hook em componentes do fluxo de autenticação
 */
export const useAuthNavigation = () => {
  return useNavigation<AuthNavigationProp>();
};

/**
 * Hook para navegação dentro do AppStack
 * Use este hook em componentes do fluxo autenticado
 */
export const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};

/**
 * Hook para navegação no RootStack
 * Use este hook quando precisar trocar entre Auth e App
 */
export const useRootNavigation = () => {
  return useNavigation<RootNavigationProp>();
};
