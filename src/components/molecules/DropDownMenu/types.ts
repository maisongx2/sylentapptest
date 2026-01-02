import { IconProps } from '@components/atoms/Icon/types';

export type DropDownMenuActionVariant = 'default' | 'destructive';

export interface DropDownMenuAction {
  label: string;
  icon: IconProps;
  variant?: DropDownMenuActionVariant;
  onPress: () => void;
}

export interface ButtonPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DropDownMenuProps {
  visible: boolean;
  onClose: () => void;
  actions: DropDownMenuAction[];
  buttonPosition?: ButtonPosition;
}

export type MenuContainerProps = {
  buttonPosition?: ButtonPosition;
  width?: number;
};

export interface IconWrapperProps {
  variant?: DropDownMenuActionVariant;
}

export type isDestructiveProps = {
  isDestructive: boolean;
};
