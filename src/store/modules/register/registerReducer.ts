import {
  RegisterAction,
  IRegisterState,
  ERegisterActionTypes,
  IRegisterReducer,
} from './registerTypes';

const INITIAL_STATE: IRegisterState = {
  loading: false,
  error: null,
};

const registerRequestReducer: IRegisterReducer = (
  state: IRegisterState,
): IRegisterState => ({
  ...state,
  loading: true,
  error: null,
});

const reducerMap = new Map<ERegisterActionTypes, IRegisterReducer>([
  [ERegisterActionTypes.REGISTER_REQUEST, registerRequestReducer],
]);

export default (
  state = INITIAL_STATE,
  action = {} as RegisterAction,
): IRegisterState => {
  const reducer = reducerMap.get(action.type);
  if (reducer) {
    return reducer(state, action);
  }
  return state;
};
