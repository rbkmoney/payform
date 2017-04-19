import Iframe from '../elements/Iframe';
import isMobile from 'ismobilejs';
import Parent from '../../communication/Parent';

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

        if (this.initScript.element) {
            this.formNode = this.initScript.getFormNode();
        }

        if (!isMobile.any) {
            this.iframe = new Iframe(this.params);
            this.iframe.render();
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        let target;
        if (isMobile.any) {
            target = window.open(`${this.params.payformHost}/html/payframe.html`);
        } else {
            target = window.frames[this.iframe.getName()];
            this.iframe.show();
        }
        const parent = new Parent(target, this.params.payformHost);
        parent.then((transport) => {
            this.opened ? this.opened() : false;
            transport.emit('init-payform', this.params);
            transport.on('payment-done', () => {
                this.close();
                this.finished ? this.finished() : false;
                this.formNode && this.formNode.action ? this.formNode.submit() : false;
            });
            transport.on('close', () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        if (!isMobile.any) {
            this.iframe.hide();
            this.iframe.destroy();
        }
        this.closed ? this.closed() : false;
    }
}