import { Initializer } from './initializer/initializer';
import * as isMobile from 'ismobilejs';

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
        console.warn('[RbkmoneyCheckout] apple pay availability', e);
        return false;
    }
};

// @ts-ignore
export const isSafari = /constructor/i.test(window.HTMLElement) || ((p) => p.toString() === '[object SafariRemoteNotification]')(!window.safari || (typeof safari !== 'undefined' && safari.pushNotification));

export const isGooglePaymentClientAvailable = (): boolean =>
    !!environment.google &&
    !!environment.google.payments.api.PaymentsClient;

export const isPaymentRequestAvailable = (): boolean =>
    !!environment.PaymentRequest;

export const isAppleEnvironment = (): boolean =>
    !isSafari && !isMobile.apple.device;
