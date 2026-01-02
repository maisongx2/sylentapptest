import { useDispatch, useSelector } from 'react-redux';
import { modalSelectors } from '@store/modules/generic/modal/modalSelectors';
import { EModalType } from '@store/modules/generic/modal/modalTypes';
import { modalActions } from '@store/modules/generic/modal/modalActions';
import { callToActionActions } from '@store/modules/callToAction/callToActionActions';
import { ICallToAction } from '@store/modules/callToAction/callToActionTypes';

export const useModal = () => {
  const dispatch = useDispatch();

  const visible = useSelector(modalSelectors.getVisible);

  const data = useSelector(modalSelectors.getData);

  const isFullscreen = data?.type === EModalType.FULLSCREEN;

  const handleButtonPress = (cta?: ICallToAction) => {
    if (cta) {
      dispatch(callToActionActions.navigateCallToAction(cta));
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  return {
    data,
    visible,
    isFullscreen,
    handleClose,
    handleButtonPress,
  };
};
