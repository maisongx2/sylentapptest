import { Icon } from '@assets/icons';
import { ICallToAction } from '@store/modules/callToAction/callToActionTypes';

export type EmptyListProps = {
  icon?: Icon;
  title: string;
  subtitle?: string;
  primaryButton?: ICallToAction;
  secondaryButton?: ICallToAction;
  closeButton?: boolean;
};
