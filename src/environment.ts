import { Initializer } from './initializer/initializer';

export interface Environment extends Window {
    RbkmoneyCheckout?: Configurator;
    ApplePaySession?: ApplePaySession;
}

export interface Configurator {
    configure: (userConfig: any) => Initializer;
}

export const environment = window as Environment;
