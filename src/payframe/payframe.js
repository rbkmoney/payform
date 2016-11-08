import Iframe from './elements/Iframe';
import PayButton from './elements/PayButton';
import StyleLink from './elements/StyleLink';
import InitScript from './elements/InitScript';
import StateInspector from './state/StateInspector';
import Utils from '../utils/Utils';
import domReady from '../utils/domReady';

domReady(function () {
    const initScript = new InitScript();
    const payformHost = initScript.getHost();
    const styles = new StyleLink(payformHost);
    const iframe = new Iframe(payformHost);
    const params = initScript.getParams();

    Object.assign(params, {
        locationHost: Utils.getOriginUrl(location.href)
    });

    const payButton = new PayButton('Pay with RBKmoney', params.buttonColor);

    styles.render();
    payButton.render();
    iframe.render();

    if (StateInspector.isInProgress(params.invoiceId)) {
        iframe.show();
        Object.assign(params, {
            state: 'inProgress'
        });
        setTimeout(() => window.frames[iframe.getName()].postMessage(params, iframe.getSrc()), 300);
    } else {
        Object.assign(params, {
            state: undefined
        });
    }

    payButton.element.onclick = () => {
        window.frames[iframe.getName()].postMessage(params, iframe.getSrc());
        iframe.show();
    };

    window.addEventListener('message', (event) => {
        console.log(event);
        if (event.data === 'payform-close') {
            iframe.hide();
            iframe.destroy();
            iframe.render();
        } else if (event.data === 'interact') {
            StateInspector.initLeaving(params.invoiceId);
        } else if (event.data === 'done') {
            StateInspector.resolve(params.invoiceId);
            window.top.location.href = params.successUrl;
        } else if (event.data === 'error') {
            StateInspector.resolve(params.invoiceId);
            window.top.location.href = params.failedUrl;
        }
    }, false);
});
