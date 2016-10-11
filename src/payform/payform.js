import 'whatwg-fetch';
import domReady from './utils/domReady';
import Communicator from './backend-communication/Communicator'
import EventPoller from './backend-communication/EventPoller';
import Form from './elements/Form';
import Spinner from './elements/Spinner';

domReady(function () {
    let initParams = {};

    window.addEventListener('message', (event) => {
        if (event && typeof event.data === 'object') {
            initParams = event.data
        }
    }, false);
    window.payformClose = () => window.parent.postMessage('payform-close', '*');

    const spinner = new Spinner('.spinner', '#payform');
    const form = new Form();

    function buildTokenizationRequest(form) {
        return {
            'paymentToolType': 'cardData',
            'cardHolder': form.getCardHolder(),
            'cardNumber': form.getCardNumber(),
            'expDate': form.getExpDate(),
            'cvv': form.getCvv()
        }
    }

    function buildSendRequest(form, invoiceId, tokenizationResponse) {
        return {
            invoiceId: invoiceId,
            token: tokenizationResponse.token,
            session: tokenizationResponse.session,
            contractInfo: {
                email: form.getEmail()
            }
        }
    }

    const tokenizationHandler = response => {
        spinner.show();
        Communicator.sendTokenization(initParams.endpointTokenization, buildSendRequest(form, initParams.invoiceId, response))
            .then(() => EventPoller.pollEvents(initParams.endpointEvents, initParams.invoiceId, 2000).then(() => {
                spinner.hide();
            }));
    };

    window.pay = () => {
        // const isValid = form.validate();
        window.Tokenizer.setPublicKey(initParams.key);
        window.Tokenizer.card.createToken(buildTokenizationRequest(form), tokenizationHandler, error => console.error(error));
    };
});
