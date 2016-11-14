import 'whatwg-fetch';
import Initialization from './backend-communication/Initialization';
import EventPoller from './backend-communication/EventPoller';
import Form from './elements/Form';
import Spinner from './elements/Spinner';
import Checkmark from './elements/Checkmark';
import PayButton from './elements/PayButton'
import ErrorPanel from './elements/ErrorPanel';
import Form3ds from './elements/Form3ds';
import TokenizerScript from './elements/TokenizerScript';
import StyleLink from './elements/StyleLink';
import RequestBuilder from './builders/RequestBuilder';
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
    const communicator = new ParentCommunicator();

    Listener.addListener(message => {
        if (message.type === 'init' || message.type === 'resume') {
            tokenizerScript.render();
            styleLink.rerender();
            params = message.data;
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
            if (params.state && params.state === 'inProgress') {
                spinner.show();
                form.hide();
                polling();
            }
        }
    });

    window.payformClose = () => communicator.send({type: 'close'});

    const polling = () => {
        console.info('polling start');
        EventPoller.pollEvents(params.endpointEvents, params.invoiceId, params.orderId, settings.pollingTimeout, settings.pollingRetries).then(result => {
            console.info('polling resolve, data:', result);
            if (result.type === 'success') {
                console.info('polling result: success, post message: done');
                spinner.hide();
                checkmark.show();
                communicator.sendWithTimeout({type: 'done'}, settings.closeFormTimeout);
            } else if (result.type === 'interact') {
                console.info('polling result: interact, post message: interact, starts 3ds interaction...');
                communicator.send({type: 'interact'});
                const redirectUrl = `${params.locationHost}/cart/checkout/review`;
                const form3ds = new Form3ds(result.data, redirectUrl);
                form3ds.render();
                form3ds.submit();
            }
        }).catch(error => {
            console.error('polling error, data:', error);
            spinner.hide();
            if (error.type === 'error') {
                errorPanel.show(`Error:\n${error.data.eventType}\nStatus: ${error.data.status}`);
            } else if (error.type === 'long polling') {
                errorPanel.show('Too long polling');
            } else {
                errorPanel.show('Unknown error');
            }
            communicator.sendWithTimeout({type: 'error'}, settings.closeFormTimeout);
        });
    };

    const onTokenCreate = paymentTools => {
        console.info('tokenization done, data:', paymentTools);
        const initRequest = RequestBuilder.buildInitRequest(params.invoiceId, paymentTools, form.getEmail());
        console.info('request to initialization endpoint start, data:', initRequest);
        Initialization.sendInit(params.endpointInit, initRequest).then(() => {
            console.info('request to initialization endpoint done');
            polling();
        });
    };

    window.pay = () => {
        if (window.Tokenizer === undefined) {
            form.hide();
            errorPanel.show('Tokenizer.js is not available');
            communicator.sendWithTimeout({type: 'error'}, settings.closeFormTimeout);
            return false;
        }
        if (form.isValid()) {
            spinner.show();
            form.hide();
            window.Tokenizer.setPublicKey(params.key);
            const request = RequestBuilder.buildTokenizationRequest(
                form.getCardHolder(),
                form.getCardNumber(),
                form.getExpDate(),
                form.getCvv()
            );
            console.info('tokenization start, data:', request);
            window.Tokenizer.card.createToken(request, onTokenCreate, error => {
                spinner.hide();
                errorPanel.show(`Error create token:\n${error.message}`);
                communicator.sendWithTimeout({type: 'error'}, settings.closeFormTimeout);
            });
        }
    };
});
