import { useCallback } from 'react';
import type { IconButtonProps } from './types';

export const useIconButton = (_props: IconButtonProps) => {
  // TODO: lógica do hook

  const handlePress = useCallback(() => {
    // TODO: implementar
  }, []);

  return {
    handlePress,
  };
};
