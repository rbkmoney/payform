import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'core-js/es6/array';
import CheckIntegration from '../utils/CheckIntegration';
import ready from '../utils/domReady';
import HtmlIntegration from './classes/HtmlIntegration';
import Checkout from './classes/Checkout';

ready(function (origin) {
    const RbkmoneyCheckout = {};
    RbkmoneyCheckout.configure = (config) => {
        const integration = CheckIntegration.check(config);
        if (integration === 'error') {
            return;
        }
        return new Checkout(origin, config, integration)
    };

    const htmlIntegration = new HtmlIntegration(origin);
    if (htmlIntegration.isAvailable()) {
        const checkout = RbkmoneyCheckout.configure(htmlIntegration.getConfig());
        const button = htmlIntegration.renderCheckoutButton();
        button.onclick = (e) => {
            e.preventDefault();
            checkout.open();
        };
    }

    window.RbkmoneyCheckout = RbkmoneyCheckout;
});
