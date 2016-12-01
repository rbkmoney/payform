import 'whatwg-fetch';
import StyleLink from './elements/StyleLink';
import domReady from '../utils/domReady';
import Listener from '../communication/Listener';
import Payform from './payform/payform';
import Utils from '../utils/Utils';

domReady(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    Listener.addListener(message => {
        if (message.type === 'init-payform' || message.type === 'resume') {
            if (Utils.isSafari()) {
                styleLink.rerender();
            }
            const payform = new Payform(message.data);
            const isResume = message.type === 'resume';
            payform.render(isResume);
        }
    });
});