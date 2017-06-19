import isMobile from 'ismobilejs';
import Iframe from '../elements/Iframe';
import Parent from '../../communication/Parent';
import UriSerializer from '../../utils/UriSerializer';

export default class Checkout {

    constructor(origin, config) {
        this.config = this.assignPopupMode(config);
        this.config = this.assignLocale(config);
        this.payformHost = origin;
        this.opened = config.opened;
        this.closed = config.closed;
        this.finished = config.finished;
        if (!this.config.popupMode) {
            this.iframe = new Iframe(this.payformHost);
        }
    }

    open() {
        const parent = new Parent(this.prepareTarget(), this.payformHost);
        parent.then((transport) => {
            this.opened ? this.opened() : false;
            if (!this.config.popupMode) {
                transport.emit('init-payform', this.config);
            }
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
        if (!this.config.popupMode) {
            this.iframe.reinitialize();
        }
        this.closed ? this.closed() : false;
    }

    prepareTarget() {
        let target;
        if (this.config.popupMode) {
            const url = `${this.payformHost}/html/payframe.html?${UriSerializer.serialize(this.config)}`;
            target = window.open(url);
        } else {
            target = window.frames[this.iframe.getName()];
            this.iframe.show();
        }
        return target;
    }

    assignPopupMode(config) {
        return Object.assign(config, {
            popupMode: isMobile.any || (config.popupMode === 'true' || config.popupMode === true)
        });
    }

    assignLocale(config) {
        return Object.assign(config, {
            locale: config.locale || 'auto'
        });
    }
}
