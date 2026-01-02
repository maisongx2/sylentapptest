import { Icon } from '@assets/icons';

export enum EIconButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text',
}

export type IconButtonProps = {
  icon: Icon;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: string;
  iconStrokeColor?: string;
  label?: string;
  type?: EIconButtonType;
  full?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};
