import Iframe from '../elements/Iframe';
import StyleLink from '../elements/StyleLink';
import Utils from '../../utils/Utils';
import Listener from '../../communication/Listener';
import CheckoutCommunicator from '../../communication/CheckoutCommunicator';
import isMobile from 'ismobilejs';

export default class Checkout {
    constructor(params, initScript) {
        this.params = params;
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
        }

        this.makeEvents();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.makeEvents = this.makeEvents.bind(this);
    }

    open() {
        if (isMobile.any) {
            const popup = window.open(`${this.params.payformHost}/payframe/payframe.html?${Utils.objectToParams(this.params)}`);

            setTimeout(() => {
                popup.postMessage({
                    message: 'init-transport',
                    origin: location.origin
                }, this.params.payformHost);
            }, 6000);

            window.addEventListener('message', (event) => {
                if (event.origin !== this.params.payformHost) {
                    return;
                }
                if (event.data.message === 'payment-done') {
                    this.params.finished ? this.params.finished() : false;
                    this.formNode && this.formNode.action ? this.formNode.submit() : false;
                }
            });

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
            switch (message.type) {
                case 'close':
                    this.close();
                    break;
                case 'done':
                    this.close();
                    this.params.finished ? this.params.finished() : false;
                    this.formNode && this.formNode.action ? this.formNode.submit() : false;
                    break;
            }

        });
    }
}