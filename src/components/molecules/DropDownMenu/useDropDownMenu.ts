import { useState } from 'react';
import type { DropDownMenuProps, DropDownMenuAction } from './types';

export const useDropDownMenu = (_props: DropDownMenuProps) => {
  const [width, setWidth] = useState(0);
  const handleActionPress = (action: DropDownMenuAction) => {
    _props.onClose();
    action.onPress();
  };
  return { width, setWidth, handleActionPress };
};
