import React from 'react';
import { icons } from 'lucide-react-native';
import { IconProps } from './types';

export const Icon: React.FC<IconProps> = ({ name, color, size = 24 }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};
