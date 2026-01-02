import { useCallback } from 'react';
import type { DividerLineProps } from './types';

export const useDividerLine = (_props: DividerLineProps) => {
  // TODO: lógica do hook

  const handlePress = useCallback(() => {
    // TODO: implementar
  }, []);

  return {
    handlePress,
  };
};
