import { Linking } from 'react-native';
import { nav } from '@navigation/helpers/navigation-helpers';
import store from '@store/index';
import { ECallToActionActionType, ICallToAction } from './callToActionTypes';

interface CallToActionHandler {
  setNext(handler: CallToActionHandler): CallToActionHandler;
  handle(cta: ICallToAction): void;
}

abstract class BaseCallToActionHandler implements CallToActionHandler {
  private nextHandler: CallToActionHandler | null = null;

  setNext(handler: CallToActionHandler): CallToActionHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(cta: ICallToAction): void {
    if (this.nextHandler) {
      this.nextHandler.handle(cta);
    }
  }
}
class NavigateHandler extends BaseCallToActionHandler {
  handle(cta: ICallToAction): void {
    if (cta.actionType === ECallToActionActionType.NAVIGATE) {
      if (cta.nested) {
        nav.navigate(cta.action as any, cta.params);
      } else if (cta.replace) {
        nav.replace(cta.action as any, cta.params);
      } else {
        nav.navigate(cta.action as any, cta.params);
      }
    } else {
      super.handle(cta);
    }
  }
}

class SagaHandler extends BaseCallToActionHandler {
  handle(cta: ICallToAction): void {
    if (cta.actionType === ECallToActionActionType.SAGA) {
      store.dispatch({
        type: `${cta.action}`,
        payload: cta.params,
      });
    } else {
      super.handle(cta);
    }
  }
}

class ExternalLinkHandler extends BaseCallToActionHandler {
  handle(cta: ICallToAction): void {
    if (cta.actionType === ECallToActionActionType.EXTERNAL_LINK) {
      Linking.openURL(`${cta.action}`);
    } else {
      super.handle(cta);
    }
  }
}

class GoBackHandler extends BaseCallToActionHandler {
  handle(cta: ICallToAction): void {
    if (cta.actionType === ECallToActionActionType.GO_BACK) {
      nav.back();
    } else {
      super.handle(cta);
    }
  }
}

export const navigateHandler = new NavigateHandler();
export const sagaHandler = new SagaHandler();
export const externalLinkHandler = new ExternalLinkHandler();
export const goBackHandler = new GoBackHandler();

export function handleCallToAction(cta: ICallToAction): void {
  navigateHandler
    .setNext(sagaHandler)
    .setNext(externalLinkHandler)
    .setNext(goBackHandler);

  navigateHandler.handle(cta);
}
