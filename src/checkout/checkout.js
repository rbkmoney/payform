import 'core-js/es6/promise';
import 'core-js/es6/object';
import ready from '../utils/domReady';
import HtmlIntegration from './classes/HtmlIntegration';
import Checkout from './classes/Checkout';

ready(function (origin) {
    const RbkmoneyCheckout = {};
    RbkmoneyCheckout.configure = (config) => new Checkout(origin, config);

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
