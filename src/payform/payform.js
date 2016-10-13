import 'whatwg-fetch';
import Initialization from './backend-communication/Initialization';
import EventPoller from './backend-communication/EventPoller';
import Form from './elements/Form';
import Spinner from './elements/Spinner';
import Checkmark from './elements/Checkmark';
import RequestBuilder from './builders/RequestBuilder';
import settings from '../settings';
import domReady from '../utils/domReady';

domReady(function () {
    let params = {};

    window.addEventListener('message', (event) => {
        if (event && typeof event.data === 'object') {
            params = event.data
        }
    }, false);
    window.payformClose = () => window.parent.postMessage('payform-close', '*');

    const spinner = new Spinner();
    const form = new Form();
    const checkmark = new Checkmark();

    const handler = paymentTools => {
        const initRequest = RequestBuilder.buildInitRequest(params.invoiceId, paymentTools, form.getEmail());
        Initialization.sendInit(params.endpointInit, initRequest).then(() => {
            EventPoller.pollEvents(params.endpointEvents, params.invoiceId, settings.pollingTimeout).then(() => {
                spinner.hide();
                checkmark.show();
                setTimeout(() => window.parent.postMessage('payform-close', '*'), settings.closeFormTimeout);
            }).catch(() => {
                console.log('Error');
            })
        });
    };

    window.pay = () => {
        // const isValid = form.validate();
        spinner.show();
        form.hide();
        window.Tokenizer.setPublicKey(params.key);
        const request = RequestBuilder.buildTokenizationRequest(
            form.getCardHolder(),
            form.getCardNumber(),
            form.getExpDate(),
            form.getCvv()
        );
        window.Tokenizer.card.createToken(request, handler, error => {
            console.error(error)
        });
    };
});
