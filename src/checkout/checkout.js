import './checkout.scss';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import isMobile from 'ismobilejs';
import CheckIntegration from '../utils/CheckIntegration';
import ready from '../utils/domReady';
import PayButton from './elements/PayButton';
import InitScript from './elements/InitScript';
import Checkout from './classes/Checkout';
import StyleLink from './elements/StyleLink';
import removeUndefined from '../utils/remove-undefined';

ready(function (origin) {
    const initScript = new InitScript();

    const RbkmoneyCheckout = {};
    RbkmoneyCheckout.configure = (config) => {
        CheckIntegration.check(config);
        Object.assign(config, {
            payformHost: origin,
            popupMode: isMobile.any || config.popupMode
        });

        config = removeUndefined(config);

        return new Checkout(config);
    };

    if (initScript.isHtmlIntegration()) {
        const styles = new StyleLink(origin);
        styles.render();
        const params = initScript.getParams();
        const payButton = new PayButton(params.label);
        payButton.render();
        payButton.onclick = (e) => {
            e.preventDefault();
            Object.assign(params, {
                finished: () => {
                    const formNode = initScript.getFormNode();
                    if (formNode && formNode.action) {
                        formNode.submit();
                    }
                }
            });
            const checkout = RbkmoneyCheckout.configure(params);
            checkout.open();
        }
    }

    window.RbkmoneyCheckout = RbkmoneyCheckout;
});
