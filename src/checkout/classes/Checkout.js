import Iframe from '../elements/Iframe';
import StyleLink from '../elements/StyleLink';
import Utils from '../../utils/Utils';
import Listener from '../../communication/Listener';
import CheckoutCommunicator from '../../communication/CheckoutCommunicator';
import isMobile from 'ismobilejs';

export default class Checkout {
    constructor(params, initScript) {
        this.params = params;

        this.opened = params.opened;
        this.closed = params.closed;
        this.finished = params.finished;

        delete this.params.opened;
        delete this.params.closed;
        delete this.params.finished;

        this.initScript = initScript;
        this.styles = new StyleLink(this.params.payformHost);
        this.styles.render();

        if (this.initScript.element) {
            this.formNode = this.initScript.getFormNode();
        }

        if (!isMobile.any) {
            this.iframe = new Iframe(this.params);
            this.communicator = new CheckoutCommunicator(this.iframe.getName(), this.iframe.getSrc());
            this.iframe.render();
            this.iframeIsLoaded = false;
            this.iframeOpenAttempts = 0;
        }

        this.makeEvents();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.makeEvents = this.makeEvents.bind(this);
    }

    open() {
        if (isMobile.any) {
            const popup = window.open(`${this.params.payformHost}/html/payframe.html?${Utils.objectToParams(this.params)}`);

            setTimeout(() => {
                popup.postMessage(
                    `{ "type": "init-transport", "origin": "${location.origin}" }`,
                    this.params.payformHost);
            }, 6000);

        } else {
            if (this.iframeIsLoaded) {
                this.iframeOpenAttempts = 0;

                this.communicator.send({
                    type: 'init-payform',
                    data: this.params
                });

                this.iframe.show();

                this.opened ? this.opened() : false;
            } else if (this.iframeOpenAttempts <= 20){
                this.iframeOpenAttempts++;
                setTimeout(this.open, 100)
            } else {
                this.iframeOpenAttempts = 0;
            }
        }
    }

    close() {
        this.iframe.hide();
        this.iframe.destroy();
        this.iframeIsLoaded = false;
        this.iframe.render();

        this.closed ? this.closed() : false;
    }

    makeEvents() {
        window.addEventListener('beforeunload', () => {
            this.communicator.send({type: 'unload'});
        });

        Listener.addListener(message => {
            if (message.invoiceID !== this.params.invoiceID) {
                return;
            }
            switch (message.type) {
                case 'payframe-ready':
                    this.iframeIsLoaded = true;
                    break;
                case 'close':
                    this.close();
                    break;
                case 'done':
                case 'payment-done':
                    this.close();
                    this.finished ? this.finished() : false;
                    this.formNode && this.formNode.action ? this.formNode.submit() : false;
                    break;
            }
        });
    }
}