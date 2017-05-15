import Iframe from '../elements/Iframe';
import Parent from '../../communication/Parent';

export default class Checkout {
    constructor(params) {
        this.params = params;

        this.opened = params.opened;
        this.closed = params.closed;
        this.finished = params.finished;

        delete this.params.opened;
        delete this.params.closed;
        delete this.params.finished;

        if (!this.params.popupMode) {
            this.iframe = new Iframe(this.params);
            this.iframe.render();
        }
    }

    open() {
        let target;
        if (this.params.popupMode) {
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
            });
            transport.on('close', () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        if (!this.params.popupMode) {
            this.iframe.hide();
            this.iframe.destroy();
            this.iframe.render();
        }
        this.closed ? this.closed() : false;
    }
}