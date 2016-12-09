import ParentCommunicator from '../../communication/ParentCommunicator';
import CheckoutModal from './elements/CheckoutModal';
import CloseButton from './elements/CloseButton';
import Spinner from './elements/Spinner';
import Form from './elements/Form';
import Checkmark from './elements/Checkmark';
import ErrorPanel from './elements/ErrorPanel';
import PayButton from './elements/PayButton';
import Tokenization from '../backend-communication/Tokenization';
import TokenizerScript from '../elements/TokenizerScript';
import ElementManager from './ElementManager';
import Initialization from '../backend-communication/Initialization';
import EventPoller from '../backend-communication/EventPoller';
import settings from '../../settings';
import Form3ds from './elements/Form3ds';

function customizeForm(params, payButton, form) {
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

function pollEvents(params, elementManager) {
    EventPoller.pollEvents(params.endpointEvents, params.invoiceId, params.orderId).then(result => {
        if (result.type === 'success') {
            elementManager.manageSuccessPolling();
            ParentCommunicator.sendWithTimeout({type: 'done'}, settings.closeFormTimeout);
        } else if (result.type === 'interact') {
            ParentCommunicator.send({type: 'interact'});
            const redirectUrl = `${params.locationHost}/cart/checkout/review`; //TODO fix
            const form3ds = new Form3ds(result.data, redirectUrl);
            form3ds.render();
            form3ds.submit();
        }
    }).catch(error => elementManager.manageError(error.message));
}

function sendInitRequest(paymentTools, params, email, elementManager) {
    Initialization.sendInit(params.endpointInit, params.invoiceId, paymentTools, email)
        .then(() => pollEvents(params, elementManager))
        .catch(error => elementManager.manageError(error.message));
}

export default class Payform {

    constructor(params) {
        this.modal = new CheckoutModal();
        this.params = params;
    }

    render(isResume) {
        this.modal.render().then(() => {
            const closeButton = new CloseButton();
            closeButton.onclick = () => ParentCommunicator.send({type: 'close'});
            const spinner = new Spinner();
            const form = new Form();
            const checkmark = new Checkmark();
            const errorPanel = new ErrorPanel();
            const payButton = new PayButton();
            const elementManager = new ElementManager(closeButton, spinner, form, checkmark, errorPanel, payButton);

            const tokenizerScript = new TokenizerScript();
            tokenizerScript.render()
                .then(() => payButton.enable())
                .catch(error => elementManager.manageError(error.message));

            customizeForm(this.params, payButton, form);

            payButton.onclick = () => {
                if (form.isValid()) {
                    elementManager.managePay();
                    const tokenization = new Tokenization(window.Tokenizer);
                    tokenization.setPublicKey(this.params.key);
                    tokenization.createToken(form.getCardHolder(), form.getCardNumber(), form.getExpDate(), form.getCvv())
                        .then(paymentTools => sendInitRequest(paymentTools, this.params, form.getEmail(), elementManager))
                        .catch(error => elementManager.manageError(error.message));
                }
            };

            if (isResume) {
                elementManager.manageResumePolling();
                pollEvents(this.params, elementManager);
            }
        });
    }
}
