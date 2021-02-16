import { Initializer } from './initializer/initializer';

export interface Environment extends Window {
    RbkmoneyCheckout?: Configurator;
    ApplePaySession?: ApplePaySession;
    PaymentRequest?: PaymentRequest;
    google?: any;
    YaPay?: any; // TODO d.ts for yandexpay is requered
}

export interface Configurator {
    configure: (userConfig: any) => Initializer;
}

export const environment = window as Environment;

export const isApplePayAvailable = (): boolean => {
    try {
        return environment.ApplePaySession && ApplePaySession.canMakePayments();
    } catch (e) {
        console.warn('[RbkmoneyCheckout] apple pay availability', e);
        return false;
    }
};

export const isGooglePaymentClientAvailable = (): boolean =>
    !!environment.google && !!environment.google.payments.api.PaymentsClient;

export const isPaymentRequestAvailable = (): boolean => !!environment.PaymentRequest;

export const isYandexPayAvailable = (): boolean => !!environment.YaPay;
