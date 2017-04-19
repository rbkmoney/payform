import './checkout.scss';
import ready from '../utils/domReady';
import PayButton from './elements/PayButton';
import InitScript from './elements/InitScript';
import Checkout from './classes/Checkout';
import StyleLink from './elements/StyleLink';

ready(function (origin) {
    const initScript = new InitScript();

    const RbkmoneyCheckout = {};
    RbkmoneyCheckout.configure = (config) => {
        Object.assign(config, {
            payformHost: origin
        });
        return new Checkout(config, initScript);
    };

    if (initScript.isHtmlIntegration()) {
        const styles = new StyleLink(origin);
        styles.render();
        const params = initScript.getParams();
        const payButton = new PayButton(params.label);
        payButton.render();
        payButton.onclick = (e) => {
            e.preventDefault();
            const checkout = RbkmoneyCheckout.configure(params);
            checkout.open();
        }
    }

    window.RbkmoneyCheckout = RbkmoneyCheckout;
});
