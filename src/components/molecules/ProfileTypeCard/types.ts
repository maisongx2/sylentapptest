import { Icon } from '@assets/icons';
import React from 'react';

export type ProfileTypeCardProps = {
  title: string;
  description: string;
  icon: Icon;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
};
