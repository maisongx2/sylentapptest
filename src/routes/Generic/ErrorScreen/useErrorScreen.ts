import { callToActionActions } from '@store/modules/callToAction/callToActionActions';
import { errorScreenSelectors } from '@store/modules/generic/errorSreen/errorScreenSelectors';
import { useDispatch, useSelector } from 'react-redux';

export const useErrorScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector(errorScreenSelectors.getData);

  const handleButtonPress = (cta: any) => {
    dispatch(callToActionActions.navigateCallToAction(cta));
  };

  return {
    data,
    handleButtonPress,
  };
};
