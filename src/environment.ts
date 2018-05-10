import { Initializer } from './initializer/initializer';

export const isApplePayAvailable = (): boolean => {
    try {
        return environment.ApplePaySession && ApplePaySession.canMakePayments();
    } catch (e) {
        console.warn('[RbkmoneyCheckout] apple pay availability', e);
        return false;
    }
};

export interface Environment extends Window {
    RbkmoneyCheckout?: Configurator;
    ApplePaySession?: ApplePaySession;
}

export interface Configurator {
    configure: (userConfig: any) => Initializer;
}

export const environment = window as Environment;
