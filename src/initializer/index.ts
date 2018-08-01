import 'url-polyfill';
import 'core-js/es6/promise';
import * as isMobile from 'ismobilejs';
import { domReady } from './dom-ready';
import { Initializer } from './initializer';
import { HtmlIntegration } from './html-integration';
import { PopupInitializer } from './popup-initializer';
import { IframeInitializer } from './iframe-initializer';
import { environment, Configurator, isApplePayAvailable } from '../environment';

const isPopupMode = (userConfig: any): boolean =>
    isMobile.any || (userConfig.popupMode === true || userConfig.popupMode === 'true') || isApplePayAvailable();

const getInstance = (origin: string, userConfig: any): Initializer =>
    isPopupMode(userConfig) ? new PopupInitializer(origin, userConfig) : new IframeInitializer(origin, userConfig);

const init = (origin: string): Configurator => ({
    configure: (userConfig: any) => getInstance(origin, userConfig)
});

domReady().then((origin) => {
    const RbkmoneyCheckout = (environment.RbkmoneyCheckout = init(origin));
    const htmlIntegration = new HtmlIntegration(origin);
    if (htmlIntegration.isAvailable) {
        const userConfig = htmlIntegration.getUserConfig();
        const checkout = RbkmoneyCheckout.configure(userConfig);
        const payButton = htmlIntegration.renderPayButton(userConfig.label);
        payButton.onclick = (e: Event) => {
            e.preventDefault();
            checkout.open();
        };
    }
});
