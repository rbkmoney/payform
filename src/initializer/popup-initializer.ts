import { PossibleEvents, Parent } from '../communication';
import { Initializer } from './initializer';
import { serialize } from 'checkout/utils';

export class PopupInitializer extends Initializer {

    open() {
        const url = `${this.origin}/v1/checkout.html?${serialize(this.config)}`;
        const target = window.open(url);
        const parent = new Parent(target, this.origin);
        parent.sendHandshake().then((transport) => {
            this.opened();
            transport.on(PossibleEvents.done, () => {
                this.close();
                this.finished();
            });
            transport.on(PossibleEvents.close, () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.closed();
    }
}
