import { Initializer } from './initializer/initializer';

export interface Environment extends Window {
    RbkmoneyCheckout?: Configurator;
    ApplePaySession?: ApplePaySession;
    PaymentRequest?: PaymentRequest;
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

export const isGooglePayAvailable = () => !!environment.PaymentRequest;
