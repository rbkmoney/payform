import { Initializer } from './initializer/initializer';
import { logPrefix } from 'checkout/log-messages';

export const isApplePayAvailable = (): boolean => {
    try {
        return environment.ApplePaySession && ApplePaySession.canMakePayments();
    } catch (e) {
        console.warn(`${logPrefix} isApplePayAvailable`, e);
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
