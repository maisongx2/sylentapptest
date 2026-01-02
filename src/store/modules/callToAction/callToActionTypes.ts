export enum ECallToActionActionTypes {
  NAVIGATE_CTA = '@callToAction/NAVIGATE_CTA',
}

export enum ECallToActionActionType {
  NAVIGATE = 'navigate',
  SAGA = 'saga',
  EXTERNAL_LINK = 'externalLink',
  GO_BACK = 'goBack',
}

export interface ICallToAction {
  label: string;
  actionType: ECallToActionActionType;
  action?: string;
  params?: Record<string, unknown>;
  replace?: boolean;
  nested?: boolean;
}

export interface ICallToActionPayload {
  cta: ICallToAction;
}

export type CallToActionAction = {
  type: ECallToActionActionTypes;
  payload: ICallToActionPayload;
};
