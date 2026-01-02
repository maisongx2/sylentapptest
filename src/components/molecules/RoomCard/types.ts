import { DropDownMenuAction } from '../DropDownMenu/types';
import { IconProps } from '@components/atoms/Icon/types';

export interface RoomCardProps {
  id: string;
  name: string;
  icon?: IconProps;
  devicesCount: number;
  onPress?: () => void;
  showChevron?: boolean;
  dropDownMenuActions?: DropDownMenuAction[];
}
