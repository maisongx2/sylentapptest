import type { EmptyListProps } from './types';
import { ICallToAction } from '@store/modules/callToAction/callToActionTypes';
import { useDispatch } from 'react-redux';
import { callToActionActions } from '@store/modules/callToAction/callToActionActions';

export const useEmptyList = (_props: EmptyListProps) => {
  const dispatch = useDispatch();

  const handleButtonPress = (cta?: ICallToAction) => {
    if (cta) {
      dispatch(callToActionActions.navigateCallToAction(cta));
    }
  };

  return {
    handleButtonPress,
  };
};
