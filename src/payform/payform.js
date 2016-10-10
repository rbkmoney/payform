import 'whatwg-fetch';
import Communicator from './backend-communication/Communicator'
import Form from './Form';

(function () {
    let initParams = {};

    this.addEventListener('message', (event) => {
        if (event && typeof event.data === 'object') {
            initParams = event.data
        }
    }, false);
    this.payformClose = () => this.parent.postMessage('payform-close', '*');

    function buildTokenizationRequest() {
        return {
            'paymentToolType': 'cardData',
            'cardHolder': Form.getCardHolder(),
            'cardNumber': Form.getCardNumber(),
            'expDate': Form.getExpDate(),
            'cvv': Form.getCvv()
        }
    }

    function buildSendRequest(invoiceId, tokenizationResponse) {
        return {
            invoiceId: invoiceId,
            token: tokenizationResponse.token,
            session: tokenizationResponse.session,
            contractInfo: {
                email: Form.getEmail()
            }
        }
    }

    const tokenizationHandler = response => {
        Communicator.sendTokenization(initParams.endpointTokenization, buildSendRequest(initParams.invoiceId, response))
            .then(() => {

            });
    };

    this.pay = () => {
        this.Tokenizer.setPublicKey(initParams.key);
        this.Tokenizer.card.createToken(buildTokenizationRequest(), tokenizationHandler, error => console.error(error));
    };

}).call(window || {});
