import { LayoutChangeEvent } from 'react-native';
import { DropDownMenuAction, ButtonPosition } from '../DropDownMenu/types';

export interface HouseCardProps {
  id: string;
  name: string;
  devicesCount: number;
  dropDownMenuActions: DropDownMenuAction[];
}

export interface UseHouseCardReturn {
  menuVisible: boolean;
  buttonLayout: ButtonPosition;
  handleMenuPress: () => void;
  handleCloseMenu: () => void;
  handleButtonLayout: (event: LayoutChangeEvent) => void;
  handleMenuLayout: (menuWidth: number) => void;
}
