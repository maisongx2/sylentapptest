import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './config/paramLists';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type RootRouteName = keyof RootStackParamList;

export function navigate<RouteName extends RootRouteName>(
  screen: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (!navigationRef.isReady()) return;

  // O wrapper é tipado, o cast aqui é só pra lidar com as overloads internas do RN
  (navigationRef.navigate as any)(screen, params);
}
