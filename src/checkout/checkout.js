import './checkout.scss';
import ready from '../utils/domReady';
import PayButton from './elements/PayButton';
import InitScript from './elements/InitScript';
import Checkout from './classes/Checkout';

ready(function (origin) {
    const initScript = new InitScript();
    if (initScript.element) {
        const invoiceID = initScript.element.dataset.invoiceId;
        const invoiceAccessToken = initScript.element.dataset.invoiceAccessToken;

        if (invoiceID && invoiceAccessToken) {
            const params = initScript.getParams();
            const payButton = new PayButton(params.label);

            Object.assign(params, {
               payformHost: origin
            });

            const checkout = new Checkout(params, initScript);

            payButton.onclick = (e) => {
                e.preventDefault();
                checkout.open();
            };

            payButton.render();
        }
    }

    const RbkmoneyCheckout = {};
    RbkmoneyCheckout.configure = (config) => {
        Object.assign(config, {
            payformHost: origin
        });
        return new Checkout(config, initScript);
    };
    window.RbkmoneyCheckout = RbkmoneyCheckout;
});
