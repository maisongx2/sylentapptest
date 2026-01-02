import { useCallback } from 'react';
import type { NavigationHeaderProps } from './types';
import { nav } from '@navigation/helpers/navigation-helpers';

export const useNavigationHeader = (_props: NavigationHeaderProps) => {
  const handlePress = useCallback(() => {
    if (_props.goBack) {
      _props.goBack();
    } else {
      nav.back();
    }
  }, [_props]);

  return {
    handlePress,
  };
};
