import { IconProps } from '@components/atoms/Icon/types';

export interface NavigationHeaderProps {
  headerText: string;
  goBack?: () => void;
  rightAction?: {
    icon: IconProps;
    onPress: () => void;
  };
}
