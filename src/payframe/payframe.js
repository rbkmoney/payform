import Iframe from './elements/Iframe';
import PayButton from './elements/PayButton';
import StyleLink from './elements/StyleLink';
import InitScript from './elements/InitScript';
import settings from '../settings';

(function () {
    const frameUrl = `${settings.host}/payform/payform.html`;
    const frameName = 'rbkmoney_payframe';

    const styles = new StyleLink(`${settings.host}/payframe/payframe.css`);
    const iframe = new Iframe(frameUrl, frameName);
    const payButton = new PayButton('Pay with RBKmoney');
    const initScript = new InitScript('rbkmoney-payform');

    styles.render();
    iframe.render();
    payButton.render();

    payButton.element.onclick = () => {
        this.frames[frameName].postMessage(initScript.getParams(), frameUrl);
        iframe.show();
    };

    this.addEventListener('message', () => {
        if (event && event.data === 'payform-close') {
            iframe.hide();
        }
    }, false);
}).call(window || {});
