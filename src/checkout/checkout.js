import 'whatwg-fetch';
import StyleLink from './elements/StyleLink';
import domReady from '../utils/domReady';
import Listener from '../communication/Listener';
import Payform from './payform/payform';

domReady(function () {
    const styleLink = new StyleLink();
    styleLink.render();

    Listener.addListener(message => {
        if (message.type === 'init-payform') {
            styleLink.rerender(); //TODO safari only
            const payform = new Payform(message.data);
            payform.render();
        }
    });
});
