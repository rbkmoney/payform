import { Initializer } from './initializer/initializer';

export interface Environment extends Window {
    RbkmoneyCheckout?: Configurator;
    ApplePaySession?: ApplePaySession;
    PaymentRequest?: PaymentRequest;
    google?: any;
}

export interface Configurator {
    configure: (userConfig: any) => Initializer;
}

export const environment = window as Environment;

export const isApplePayAvailable = (): boolean => {
    try {
        return environment.ApplePaySession && ApplePaySession.canMakePayments();
    } catch (e) {
        console.warn('[Checkout] apple pay availability', e);
        return false;
    }
};

export const isGooglePaymentClientAvailable = (): boolean =>
    !!environment.google && !!environment.google.payments.api.PaymentsClient;

export const isPaymentRequestAvailable = (): boolean => !!environment.PaymentRequest;
