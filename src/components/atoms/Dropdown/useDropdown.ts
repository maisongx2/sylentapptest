import { useState, useRef } from 'react';
import { View } from 'react-native';
import type { DropdownOption } from './index';

export const useDropdown = (
  onSelect?: (option: DropdownOption) => void,
) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const buttonRef = useRef<View>(null);

  const toggleDropdown = () => {
    if (!visible) {
      buttonRef.current?.measure((fx, fy, width, height, px, py) => {
        setDropdownTop(py + height);
      });
    }
    setVisible(!visible);
  };

  const handleSelect = (option: DropdownOption) => {
    if (option.onPress) {
      option.onPress();
    }
    if (onSelect) {
      onSelect(option);
    }
    setVisible(false);
  };

  return {
    visible,
    buttonRef,
    dropdownTop,
    toggleDropdown,
    handleSelect,
  };
};
