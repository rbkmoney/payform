import Iframe from './elements/Iframe';
import PayButton from './elements/PayButton';
import StyleLink from './elements/StyleLink';
import InitScript from './elements/InitScript';
import StateInspector from './state/StateInspector';
import settings from '../settings';
import domReady from '../utils/domReady';

domReady(function () {
    const frameUrl = `${settings.host}/payform/payform.html`;
    const frameName = 'rbkmoney_payframe';

    const styles = new StyleLink(`${settings.host}/payframe/payframe.css`);
    const iframe = new Iframe(frameUrl, frameName);
    const payButton = new PayButton('Pay with RBKmoney');
    const initScript = new InitScript('rbkmoney-payform');
    const params = initScript.getParams();

    styles.render();
    payButton.render();
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
        }
    }, false);
});
