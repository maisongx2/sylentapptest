import {
  ModalAction,
  IModalState,
  EModalActionTypes,
  IModalReducer,
} from './modalTypes';

const INITIAL_STATE: IModalState = {
  visible: false,
  data: null,
};

const showModalReducer: IModalReducer = (
  state: IModalState,
  action: ModalAction,
): IModalState => ({
  ...state,
  visible: true,
  data: action.payload?.data ?? null,
});

const closeModalReducer: IModalReducer = (
  state: IModalState,
): IModalState => ({
  ...state,
  visible: false,
  data: null,
});

const reducerMap = new Map<EModalActionTypes, IModalReducer>([
  [EModalActionTypes.SHOW_MODAL, showModalReducer],
  [EModalActionTypes.CLOSE_MODAL, closeModalReducer],
]);

export default (
  state = INITIAL_STATE,
  action = {} as ModalAction,
): IModalState => {
  const reducer = reducerMap.get(action.type);
  if (reducer) {
    return reducer(state, action);
  }
  return state;
};
