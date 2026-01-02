import { EModalActionTypes, ModalAction, IModalData } from './modalTypes';

const showModal = (data: IModalData): ModalAction => ({
  type: EModalActionTypes.SHOW_MODAL,
  payload: { data },
});

const closeModal = (): ModalAction => ({
  type: EModalActionTypes.CLOSE_MODAL,
});

export const modalActions = {
  showModal,
  closeModal,
};
