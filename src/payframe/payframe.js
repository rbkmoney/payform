import './payframe.scss';
import ready from '../utils/domReady';
import PayButton from './elements/PayButton';
import InitScript from './elements/InitScript';
import Checkout from './Checkout';

ready(function (origin) {
    const initScript = new InitScript();
    const invoiceID = initScript.element.dataset.invoiceId;
    const invoiceAccessToken = initScript.element.dataset.invoiceAccessToken;

    if (invoiceID && invoiceAccessToken) {
        const params = initScript.getParams();
        const payButton = new PayButton(params.label);

        Object.assign(params, {
           payformHost: origin
        });

        const checkout = new Checkout(params);

        payButton.onclick = (e) => {
            e.preventDefault();
            checkout.open();
        };

        payButton.render();
    } else {
        const RbkmoneyCheckout = {};

        RbkmoneyCheckout.configure = (config) => {
            Object.assign(config, {
           payformHost: origin
        });

            return new Checkout(config);
        };

        window.RbkmoneyCheckout = RbkmoneyCheckout;
    }
});
