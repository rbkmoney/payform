import { IframeContainer } from './iframe-container';
import { Initializer } from './initializer';
import { initialize } from '../communicator';

export class IframeInitializer extends Initializer {

    private container: IframeContainer;

    constructor(origin: string, userConfig: any) {
        super(origin, userConfig);
        this.container = new IframeContainer(origin);
    }

    open() {
        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        initialize(target, this.origin, 'checkout-initializer').then((transport) => {
            this.opened();
            transport.emit('checkout-init', this.config);
            transport.on('checkout-finished', () => {
                transport.destroy();
                this.container.reinitialize();
                this.finished();
            });
            transport.on('checkout-close', () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.container.reinitialize();
        this.closed();
    }
}
