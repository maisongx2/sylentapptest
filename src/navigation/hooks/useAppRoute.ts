import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../config/paramLists';
import { Route } from '../config/routes';

export const useAppRoute = <T extends Route>() => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};
