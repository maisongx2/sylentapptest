import { useCallback, useEffect } from 'react';
import { AuthRoute, useAppNavigation } from '@navigation/index';
import { useFocusEffect } from '@react-navigation/native';

export const useWelcome = () => {
  const navigation = useAppNavigation();

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate(AuthRoute.Login);
      }, 2000);

      return () => clearTimeout(timer);
    }, [navigation])
  );
};
