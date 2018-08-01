export const communicatorInstanceName = 'samsung-pay-transport';

export const URIPath = '/v1/samsung-pay-interaction.html';

export enum Event {
    CONNECT = 'connect',
    RESULT = 'result'
}

export interface ConnectData {
    transactionId: string;
    href: string;
    serviceId: string;
    callbackURL: string;
    cancelURL: string;
    countryCode: 'br' | 'ru' | 'se' | 'uk' | 'us' | 'kr';
    publicKeyMod: string;
    publicKeyExp: string;
    keyId: string;
}

export enum Type {
    ERROR = 'error',
    SUCCESS = 'success'
}

export type ResultData =
    | {
          type: Type.SUCCESS;
          refId: string;
      }
    | {
          type: Type.ERROR;
          code?: string;
      };
