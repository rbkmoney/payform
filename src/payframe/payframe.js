import Iframe from './Iframe';
import PayButton from './PayButton';
import StyleLink from './StyleLink';
import settings from '../settings';

(function () {
    new StyleLink(`${settings.url}/payframe/payframe.css`);
    const iframe = new Iframe(`${settings.url}/payform/payform.html`);
    const payButton = new PayButton('Pay with RBKmoney');
    payButton.element.onclick = () => iframe.show();

    this.addEventListener('message', () => {
        if (event && event.data === 'payform-close') {
            iframe.hide();
        }
    }, false);
}).call(window || {});
