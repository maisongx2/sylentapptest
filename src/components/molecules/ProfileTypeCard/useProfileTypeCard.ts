import { useCallback } from 'react';
import type { ProfileTypeCardProps } from './types';

export const useProfileTypeCard = ({
  disabled,
  onPress,
}: Partial<ProfileTypeCardProps>) => {
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };
  return {
    handlePress,
  };
};
