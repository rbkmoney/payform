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
        if (message.type === 'init-payform') {
            if (Utils.isSafari()) {
                styleLink.rerender();
            }
            const payform = new Payform(message.data);
            payform.render();
        }
    });
});
