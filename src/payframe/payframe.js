import Iframe from './elements/Iframe';
import PayButton from './elements/PayButton';
import StyleLink from './elements/StyleLink';
import InitScript from './elements/InitScript';
import StateInspector from './state/StateInspector';
import Utils from '../utils/Utils';
import Listener from '../communication/Listener';
import CheckoutCommunicator from '../communication/CheckoutCommunicator';
import ready from '../utils/domReady';
import processingCallback from './callbacks/processingCallback';

ready(function () {
    const initScript = new InitScript();
    const payformHost = initScript.getHost();
    const styles = new StyleLink(payformHost);
    const iframe = new Iframe(payformHost);
    const communicator = new CheckoutCommunicator(iframe.getName(), iframe.getSrc());
    const params = initScript.getParams();

    Object.assign(params, {
        locationHost: Utils.getOriginUrl(location.href)
    });

    const payButton = new PayButton('Pay with RBKmoney', params.buttonColor);
    payButton.onclick = () => {
        communicator.send({
            type: 'init-payform',
            data: params
        });
        iframe.show();
    };
    payButton.render();

    styles.render();
    iframe.render();

    if (StateInspector.isInProgress(params.invoiceId)) {
        iframe.show();
        setTimeout(() => communicator.send({
            type: 'resume',
            data: params
        }), 500);
    }

    Listener.addListener(message => {
        if (message.type === 'close') {
            iframe.hide();
            iframe.destroy();
            iframe.render();
        } else if (message.type === 'interact') {
            StateInspector.initLeaving(params.invoiceId);
        } else if (message.type === 'done') {
            StateInspector.resolve(params.invoiceId);
            processingCallback(params.endpointSuccess, params.invoiceId);
        } else if (message.type === 'error') {
            StateInspector.resolve(params.invoiceId);
            processingCallback(params.endpointFailed, params.invoiceId);
        }
    });

});
