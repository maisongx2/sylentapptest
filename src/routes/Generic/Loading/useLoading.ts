// ErrorScreenPage.tsx
import { useCallback } from 'react';
import { nav } from '@navigation/helpers/navigation-helpers';
import { useFocusEffect } from '@react-navigation/native';

export const useIsLoading = () => {
  useFocusEffect(
    useCallback(() => {
      console.log('🚀 ~ Tela focada');

      return () => {
        console.log('🚀 ~ Saindo da tela (blur)');
        nav.removeFromStack();
        // Aqui você pode fazer o cleanup
      };
    }, []),
  );
};
