import 'whatwg-fetch';
import Initialization from './backend-communication/Initialization';
import EventPoller from './backend-communication/EventPoller';
import Tokenization from './backend-communication/Tokenization';
import Form from './elements/Form';
import Spinner from './elements/Spinner';
import Checkmark from './elements/Checkmark';
import PayButton from './elements/PayButton'
import ErrorPanel from './elements/ErrorPanel';
import Form3ds from './elements/Form3ds';
import TokenizerScript from './elements/TokenizerScript';
import StyleLink from './elements/StyleLink';
import CloseButton from './elements/CloseButton';
import settings from '../settings';
import domReady from '../utils/domReady';
import Listener from '../communication/Listener';
import ParentCommunicator from '../communication/ParentCommunicator';

domReady(function () {
    let params = {};

    const styleLink = new StyleLink();
    styleLink.render();
    const tokenizerScript = new TokenizerScript();
    const spinner = new Spinner();
    const form = new Form();
    const checkmark = new Checkmark();
    const errorPanel = new ErrorPanel();
    const payButton = new PayButton();
    const closeButton = new CloseButton();
    closeButton.onclick = () => communicator.send({type: 'close'});
    const communicator = new ParentCommunicator();

    Listener.addListener(message => {
        if (message.type === 'init' || message.type === 'resume') {
            params = message.data;
            styleLink.rerender();
            customizeForm();
            if (params.state && params.state === 'inProgress') {
                spinner.show();
                form.hide();
                pollEvents();
            }
            tokenizerScript.render()
                .then(() => payButton.enable())
                .catch(() => errorPanel.show('Tokenizer is not available'));
        }
    });

    payButton.onclick = () => {
        if (form.isValid()) {
            spinner.show();
            form.hide();
            errorPanel.hide();
            closeButton.hide();
            const tokenization = new Tokenization(window.Tokenizer);
            tokenization.setPublicKey(params.key);
            tokenization.createToken(form.getCardHolder(), form.getCardNumber(), form.getExpDate(), form.getCvv())
                .then(paymentTools => sendInitRequest(paymentTools))
                .catch(error => resolveElementsAfterError('Create token error', error, 'Card tokenization failed'));
        }
    };

    function pollEvents() {
        EventPoller.pollEvents(params.endpointEvents, params.invoiceId, params.orderId, settings.pollingTimeout, settings.pollingRetries).then(result => {
            if (result.type === 'success') {
                spinner.hide();
                checkmark.show();
                communicator.sendWithTimeout({type: 'done'}, settings.closeFormTimeout);
            } else if (result.type === 'interact') {
                communicator.send({type: 'interact'});
                const redirectUrl = `${params.locationHost}/cart/checkout/review`;
                const form3ds = new Form3ds(result.data, redirectUrl);
                form3ds.render();
                form3ds.submit();
            }
        }).catch(error => {
            resolveElementsAfterError('Polling error:', error, 'An error occurred while processing your card');
        });
    }

    function sendInitRequest(paymentTools) {
        Initialization.sendInit(params.endpointInit, params.invoiceId, paymentTools, form.getEmail())
            .then(() => pollEvents())
            .catch(error => {
                resolveElementsAfterError('Send init request error', error, error.message);
                communicator.sendWithTimeout({type: 'error'}, settings.closeFormTimeout);
            });
    }

    function customizeForm() {
        payButton.renderText(params.amount, params.currency);
        if (params.logo) {
            form.setLogo(params.logo);
        }
        if (params.name) {
            form.setName(params.name);
        }
        if (params.buttonColor) {
            payButton.setPayButtonColor(params.buttonColor);
        }
    }

    function resolveElementsAfterError(logMessage, error, panelMessage) {
        console.error(logMessage, error);
        spinner.hide();
        form.show();
        closeButton.show();
        errorPanel.show(panelMessage);
    }
});
