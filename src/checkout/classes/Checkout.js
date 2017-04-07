import Iframe from '../elements/Iframe';
import StyleLink from '../elements/StyleLink';
import InitScript from '../elements/InitScript';
import Utils from '../../utils/Utils';
import Listener from '../../communication/Listener';
import CheckoutCommunicator from '../../communication/CheckoutCommunicator';
import processingCallback from '../callbacks/processingCallback';
import isMobile from 'ismobilejs';

export default class Checkout {
    constructor(params) {
        this.params = params;

        this.initScript = new InitScript();
        this.styles = new StyleLink(this.params.payformHost);
        this.iframe = new Iframe(this.params.payformHost);
        this.communicator = new CheckoutCommunicator(this.iframe.getName(), this.iframe.getSrc());
        this.formNode = this.initScript.getFormNode();


        Object.assign(this.params, {
            locationHost: params.payformHost
        });

        this.styles.render();
        this.iframe.render();

        this.makeEvents();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.makeEvents = this.makeEvents.bind(this);
    }

    open() {
        if (isMobile.any) {
            window.open(`${this.params.payformHost}/payframe/payframe.html?${Utils.objectToParams(this.params)}`);
        } else {
            this.communicator.send({
                type: 'init-payform',
                data: this.params
            });
            this.iframe.show();

            this.params.opened ? this.params.opened() : false;
        }
    }

    close() {
        this.iframe.hide();
        this.iframe.destroy();
        this.iframe.render();

        this.params.closed ? this.params.closed() : false;
    }

    makeEvents() {
        window.addEventListener('beforeunload', () => {
            this.communicator.send({type: 'unload'});
        });

        Listener.addListener(message => {
            if (this.params.invoiceID === message.invoiceID) {
                switch (message.type) {
                    case 'close':
                        this.close();
                        break;
                    case 'done':
                        this.close();
                        processingCallback(this.params.endpointSuccess, this.params.endpointSuccessMethod);
                        this.formNode && this.formNode.action ? this.formNode.submit() : false;
                        break;
                    case 'error':
                        this.close();
                        processingCallback(this.params.endpointFailed, this.params.endpointFailedMethod);
                        break;
                    case 'start3ds':
                        this.iframe.enable3DS();
                        break;
                    case 'finish3ds':
                        this.iframe.disable3DS();
                        break;
                }
            }

        });
    }
}