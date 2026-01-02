import { call, put, takeLatest } from 'redux-saga/effects';
import { RegisterAction, ERegisterActionTypes } from './registerTypes';
import registerService from './registerService';
import { authNav, nav } from '@navigation/helpers/navigation-helpers';
import { AuthRoute } from '@navigation/config/routes';
import { errorScreenActions } from '../generic/errorSreen/errorScreenActions';
import { ECallToActionActionType } from '../callToAction/callToActionTypes';
import { modalActions } from '../generic/modal/modalActions';
import { EModalType } from '../generic/modal/modalTypes';
import { Icon } from '@assets/icons';
import TuyaService from '@native-modules/tuya/TuyaModule';

function* registerWorker(action: RegisterAction) {
  try {
    if (!action.payload?.registerData) {
      throw new Error('Dados de cadastro inválidos');
    }

    yield put(authNav.toLoadingScreen);

    const registerData = action.payload.registerData;

    // todo tuya register user
    try {
      yield call(
        TuyaService.registerByEmail,
        '55', // countryCode hardcoded (Brazil)
        registerData.email,
        registerData.password,
        registerData.verificationCode, // the 6-digit code from the form
      );
    } catch (tuyaError) {
      console.warn('Tuya registration failed, ignoring:', tuyaError);
      // optional: you can dispatch an action or alert user
    }
    yield call(registerService.register, registerData);

    yield put(authNav.toLogin);
    yield put(
      modalActions.showModal({
        type: EModalType.FULLSCREEN,
        icon: Icon.email,
        title: 'Conta criada com sucesso!',
        subtitle:
          'Acesse seu e-mail e confirme o cadastro para ativar sua conta.',
        closeButton: true,
      }),
    );
  } catch (e: any) {
    const description =
      e?.response?.data?.message || e?.message || 'Erro ao fazer cadastro';

    const errorCode = e?.response?.status || 'REGISTER_ERROR';
    yield put(nav.back);

    if (errorCode === 409) {
      yield put(
        modalActions.showModal({
          type: EModalType.FOOTER,
          title: 'Você já tem uma conta',
          subtitle:
            'Esse e-mail já está vinculado a um usuário. Deseja acessar sua conta?',
          closeButton: true,
        }),
      );
    } else {
      yield put(
        errorScreenActions.showErrorScreen({
          title: 'Erro no Cadastro',
          description,
          errorCode,
          primaryButton: {
            label: 'Tentar Novamente',
            actionType: ECallToActionActionType.NAVIGATE,
            action: AuthRoute.SignUp,
            replace: true,
          },
          secondaryButton: {
            replace: true,
            label: 'Voltar para Login',
            actionType: ECallToActionActionType.NAVIGATE,
            action: AuthRoute.Login,
          },
        }),
      );
    }
  }
}

export default [
  takeLatest(ERegisterActionTypes.REGISTER_REQUEST, registerWorker),
];
