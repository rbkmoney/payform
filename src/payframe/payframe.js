import Iframe from './elements/Iframe';
import PayButton from './elements/PayButton';
import StyleLink from './elements/StyleLink';
import InitScript from './elements/InitScript';
import StateInspector from './state/StateInspector';
import Utils from '../utils/Utils';
import domReady from '../utils/domReady';

domReady(function () {
    const scriptUrl = Utils.getScriptUrl();
    const payformHost = Utils.getOriginUrl(scriptUrl);
    const frameUrl = `${payformHost}/payform/payform.html`;
    const frameName = 'rbkmoney_payframe';
    const scriptClass = 'rbkmoney-payform';

    const styles = new StyleLink(`${payformHost}/payframe/payframe.css`);
    const iframe = new Iframe(frameUrl, frameName);
    const initScript = new InitScript(scriptClass);
    const params = initScript.getParams();
    Object.assign(params, {
        locationHost: Utils.getOriginUrl(location.href)
    });
    const payButton = new PayButton('Pay with RBKmoney', params.buttonColor);

    styles.render();
    payButton.render(scriptClass);
    iframe.render();

    if (StateInspector.isInProgress(params.invoiceId)) {
        iframe.show();
        Object.assign(params, {
            state: 'inProgress'
        });
        setTimeout(() => window.frames[frameName].postMessage(params, frameUrl), 300); //TODO Fix it
    } else {
        Object.assign(params, {
            state: undefined
        });
    }

    payButton.element.onclick = () => {
        iframe.show();
        window.frames[frameName].postMessage(params, frameUrl);
    };

    window.addEventListener('message', () => {
        if (event.data === 'payform-close') {
            iframe.hide();
            iframe.destroy();
            iframe.render();
            console.info('payframe receive message: payform-close');
        } else if (event.data === 'interact') {
            StateInspector.initLeaving(params.invoiceId);
            console.info('payframe receive message: interact');
        } else if (event.data === 'done') {
            StateInspector.resolve(params.invoiceId);
            console.info('payframe receive message: done');
            window.top.location.href = params.successUrl;
        } else if (event.data === 'error') {
            StateInspector.resolve(params.invoiceId);
            console.info('payframe receive message: error');
            window.top.location.href = params.failedUrl;
        }
    }, false);
});
