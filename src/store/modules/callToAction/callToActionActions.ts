import {
  ECallToActionActionTypes,
  ICallToAction,
  CallToActionAction,
} from './callToActionTypes';

const navigateCallToAction = (cta: ICallToAction): CallToActionAction => ({
  type: ECallToActionActionTypes.NAVIGATE_CTA,
  payload: { cta },
});

export const callToActionActions = {
  navigateCallToAction,
};
