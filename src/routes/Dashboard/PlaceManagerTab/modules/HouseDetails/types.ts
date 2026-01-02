import { IconProps } from '@components/atoms/Icon/types';
import { DropDownMenuAction } from '@components/molecules/DropDownMenu/types';
export interface RoomCardProps {
  id: string;
  name: string;
  icon: IconProps;
  devicesCount: number;
  onPress?: () => void;
  showChevron?: boolean;
  dropDownMenuActions?: DropDownMenuAction[];
}
